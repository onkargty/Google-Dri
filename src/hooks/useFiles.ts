import { useState, useEffect } from 'react';
import { supabase, STORAGE_BUCKET } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { FileItem as FileItemType } from '../types';

interface StorageUsage {
  used_bytes: number;
  total_bytes: number;
  file_count: number;
}

type NavigationSection = 'my-drive' | 'recent' | 'starred' | 'shared' | 'trash';

export function useFiles(currentFolderId: string | null = null, section: NavigationSection = 'my-drive') {
  const [files, setFiles] = useState<FileItemType[]>([]);
  const [folders, setFolders] = useState<FileItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageUsage, setStorageUsage] = useState<StorageUsage>({
    used_bytes: 0,
    total_bytes: 107374182400, // 100GB
    file_count: 0,
  });

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Not authenticated');
        return;
      }

      console.log('Fetching files for section:', section, 'folder:', currentFolderId);

      let filesData: any[] = [];
      let foldersData: any[] = [];

      switch (section) {
        case 'my-drive':
          // Fetch folders for My Drive
          let foldersQuery = supabase
            .from('folders')
            .select('*')
            .eq('owner_id', user.id)
            .order('name', { ascending: true });

          if (currentFolderId === null) {
            foldersQuery = foldersQuery.is('parent_id', null);
          } else {
            foldersQuery = foldersQuery.eq('parent_id', currentFolderId);
          }

          const { data: folders, error: foldersError } = await foldersQuery;
          if (foldersError) {
            console.error('Error fetching folders:', foldersError);
            setError(`Error fetching folders: ${foldersError.message}`);
          } else {
            foldersData = folders || [];
          }

          // Fetch files for My Drive
          let filesQuery = supabase
            .from('files')
            .select('*')
            .eq('owner_id', user.id)
            .eq('is_deleted', false)
            .order('name', { ascending: true });

          if (currentFolderId === null) {
            filesQuery = filesQuery.is('folder_id', null);
          } else {
            filesQuery = filesQuery.eq('folder_id', currentFolderId);
          }

          const { data: myFiles, error: filesError } = await filesQuery;
          if (filesError) {
            console.error('Error fetching files:', filesError);
            setError(`Error fetching files: ${filesError.message}`);
          } else {
            filesData = myFiles || [];
          }
          break;

        case 'recent':
          // Fetch recent files
          const { data: recentFiles, error: recentError } = await supabase
            .from('recent_files')
            .select(`
              file_id,
              accessed_at,
              files!inner (
                id,
                name,
                size,
                type,
                storage_path,
                folder_id,
                owner_id,
                starred,
                created_at,
                updated_at,
                last_accessed_at
              )
            `)
            .eq('user_id', user.id)
            .order('accessed_at', { ascending: false })
            .limit(50);

          if (recentError) {
            console.error('Error fetching recent files:', recentError);
            setError(`Error fetching recent files: ${recentError.message}`);
          } else {
            filesData = (recentFiles || []).map(item => item.files).filter(Boolean);
          }
          break;

        case 'starred':
          // Fetch starred files
          const { data: starredFiles, error: starredError } = await supabase
            .from('files')
            .select('*')
            .eq('owner_id', user.id)
            .eq('starred', true)
            .eq('is_deleted', false)
            .order('updated_at', { ascending: false });

          if (starredError) {
            console.error('Error fetching starred files:', starredError);
            setError(`Error fetching starred files: ${starredError.message}`);
          } else {
            filesData = starredFiles || [];
          }
          break;

        case 'shared':
          // Fetch shared files
          const { data: sharedFiles, error: sharedError } = await supabase
            .from('shared_files')
            .select(`
              file_id,
              permission,
              created_at,
              files!inner (
                id,
                name,
                size,
                type,
                storage_path,
                folder_id,
                owner_id,
                starred,
                created_at,
                updated_at
              )
            `)
            .eq('shared_with_user_id', user.id)
            .order('created_at', { ascending: false });

          if (sharedError) {
            console.error('Error fetching shared files:', sharedError);
            setError(`Error fetching shared files: ${sharedError.message}`);
          } else {
            filesData = (sharedFiles || []).map(item => item.files).filter(Boolean);
          }
          break;

        case 'trash':
          // Fetch deleted files
          const { data: deletedFiles, error: deletedError } = await supabase
            .from('files')
            .select('*')
            .eq('owner_id', user.id)
            .eq('is_deleted', true)
            .order('deleted_at', { ascending: false });

          if (deletedError) {
            console.error('Error fetching deleted files:', deletedError);
            setError(`Error fetching deleted files: ${deletedError.message}`);
          } else {
            filesData = deletedFiles || [];
          }
          break;
      }

      // Convert to FileItem format
      const folderItems: FileItemType[] = foldersData.map(folder => ({
        id: folder.id,
        name: folder.name,
        type: 'folder' as const,
        size: 0,
        mime_type: undefined,
        path: '',
        parent_id: folder.parent_id,
        owner_id: folder.owner_id,
        shared: false,
        starred: false, 
        created_at: folder.created_at,
        updated_at: folder.updated_at,
      }));

      const fileItems: FileItemType[] = filesData.map(file => ({
        id: file.id,
        name: file.name,
        type: 'file' as const,
        size: file.size || 0,
        mime_type: file.type,
        path: file.storage_path || '',
        parent_id: file.folder_id,
        owner_id: file.owner_id,
        shared: false,
        starred: file.starred || false,
        created_at: file.created_at,
        updated_at: file.updated_at,
      }));

      setFolders(folderItems);
      setFiles(fileItems);

      // Get storage usage (only for my-drive section)
      if (section === 'my-drive') {
        const { data: usageData, error: usageError } = await supabase
          .from('files')
          .select('size')
          .eq('owner_id', user.id)
          .eq('is_deleted', false);

        if (!usageError && usageData) {
          const totalSize = usageData.reduce((sum, file) => sum + (file.size || 0), 0);
          setStorageUsage(prev => ({
            ...prev,
            used_bytes: totalSize,
            file_count: usageData.length,
          }));
        }
      }
    } catch (error) {
      console.error('Error in fetchFiles:', error);
      setError(`Unexpected error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentFolderId, section]);

  const uploadFile = async (file: File, folderId: string | null = currentFolderId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      console.log('Uploading file:', file.name, 'to folder:', folderId);

      const fileId = uuidv4();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${user.id}/${fileId}-${sanitizedFileName}`;

      console.log('Storage path:', fileName);

      // Validate folder exists if folderId is provided
      if (folderId) {
        const { data: folderCheck, error: folderError } = await supabase
          .from('folders')
          .select('id')
          .eq('id', folderId)
          .eq('owner_id', user.id)
          .single();

        if (folderError || !folderCheck) {
          console.error('Folder validation error:', folderError);
          throw new Error('Target folder not found or access denied');
        }
      }

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('bucket does not exist')) {
          throw new Error('Storage bucket "files" not found. Please create it in your Supabase dashboard under Storage > New bucket > Name: "files" > Make it public.');
        }
        if (uploadError.message.includes('The resource was not found')) {
          throw new Error('Storage bucket configuration issue. Please check that the "files" bucket exists and is properly configured.');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('File uploaded to storage:', uploadData);

      // Save file metadata to database
      const { data: fileData, error: fileError } = await supabase
        .from('files')
        .insert({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          storage_path: fileName,
          folder_id: folderId,
          owner_id: user.id,
          starred: false,
          is_deleted: false,
          last_accessed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (fileError) {
        console.error('Database insert error:', fileError);
        // Clean up storage if database insert fails
        try {
          await supabase.storage.from(STORAGE_BUCKET).remove([fileName]);
        } catch (cleanupError) {
          console.warn('Failed to cleanup storage after database error:', cleanupError);
        }
        throw new Error(`Database error: ${fileError.message}`);
      }

      // Log activity
      try {
        await supabase.rpc('log_file_activity', {
          file_uuid: fileId,
          activity: 'upload'
        });
      } catch (activityError) {
        console.warn('Failed to log activity:', activityError);
      }

      console.log('File metadata saved:', fileData);
      await fetchFiles();
      return fileData;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const createFolder = async (name: string, parentId: string | null = currentFolderId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      console.log('Creating folder:', name, 'in parent:', parentId);

      const { data: folderData, error } = await supabase
        .from('folders')
        .insert({
          name: name.trim(),
          parent_id: parentId,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating folder:', error);
        throw new Error(`Failed to create folder: ${error.message}`);
      }

      console.log('Folder created:', folderData);
      await fetchFiles();
      return folderData;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  };

  const deleteFile = async (fileId: string, isFolder: boolean = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      console.log('Deleting', isFolder ? 'folder' : 'file', fileId);

      if (isFolder) {
        // Soft delete folder
        const { error: deleteError } = await supabase
          .from('folders')
          .delete()
          .eq('id', fileId)
          .eq('owner_id', user.id);

        if (deleteError) {
          throw new Error(`Failed to delete folder: ${deleteError.message}`);
        }
      } else {
        // Soft delete file
        const { error: deleteError } = await supabase
          .from('files')
          .update({ 
            is_deleted: true, 
            deleted_at: new Date().toISOString() 
          })
          .eq('id', fileId)
          .eq('owner_id', user.id);

        if (deleteError) {
          throw new Error(`Failed to delete file: ${deleteError.message}`);
        }

        // Log activity
        try {
          await supabase.rpc('log_file_activity', {
            file_uuid: fileId,
            activity: 'delete'
          });
        } catch (activityError) {
          console.warn('Failed to log activity:', activityError);
        }
      }

      console.log('Successfully deleted');
      await fetchFiles();
    } catch (error) {
      console.error('Delete operation failed:', error);
      throw error;
    }
  };

  const toggleStar = async (fileId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const file = [...files, ...folders].find(f => f.id === fileId);
      if (!file) throw new Error('File not found');

      console.log('Toggling star for file:', fileId, 'current:', file.starred);

      const { error } = await supabase
        .from('files')
        .update({ starred: !file.starred })
        .eq('id', fileId)
        .eq('owner_id', user.id);

      if (error) {
        console.error('Error toggling star:', error);
        throw new Error(`Failed to update star: ${error.message}`);
      }

      // Log activity
      try {
        await supabase.rpc('log_file_activity', {
          file_uuid: fileId,
          activity: file.starred ? 'unstar' : 'star'
        });
      } catch (activityError) {
        console.warn('Failed to log activity:', activityError);
      }

      await fetchFiles();
    } catch (error) {
      console.error('Error toggling star:', error);
      throw error;
    }
  };

  const renameFile = async (fileId: string, newName: string, isFolder: boolean = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const trimmedName = newName.trim();
      if (!trimmedName) throw new Error('Name cannot be empty');

      console.log('Renaming', isFolder ? 'folder' : 'file', ':', fileId, 'to:', trimmedName);

      if (isFolder) {
        const { error } = await supabase
          .from('folders')
          .update({ name: trimmedName })
          .eq('id', fileId)
          .eq('owner_id', user.id);

        if (error) {
          console.error('Error renaming folder:', error);
          throw new Error(`Failed to rename folder: ${error.message}`);
        }
      } else {
        const { error } = await supabase
          .from('files')
          .update({ name: trimmedName })
          .eq('id', fileId)
          .eq('owner_id', user.id);

        if (error) {
          console.error('Error renaming file:', error);
          throw new Error(`Failed to rename file: ${error.message}`);
        }

        // Log activity
        try {
          await supabase.rpc('log_file_activity', {
            file_uuid: fileId,
            activity: 'edit'
          });
        } catch (activityError) {
          console.warn('Failed to log activity:', activityError);
        }
      }

      console.log('Successfully renamed', isFolder ? 'folder' : 'file');
      await fetchFiles();
    } catch (error) {
      console.error('Error renaming:', error);
      throw error;
    }
  };

  const downloadFile = async (fileId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      console.log('Downloading file:', fileId);

      // Get file info
      const { data: fileData, error: fetchError } = await supabase
        .from('files')
        .select('name, storage_path')
        .eq('id', fileId)
        .eq('owner_id', user.id)
        .single();

      if (fetchError) {
        console.error('Error fetching file for download:', fetchError);
        throw new Error(`File not found: ${fetchError.message}`);
      }

      if (!fileData.storage_path) {
        throw new Error('File storage path not found');
      }

      // Download from storage
      const { data: fileBlob, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .download(fileData.storage_path);

      if (error) {
        console.error('Error downloading from storage:', error);
        throw new Error(`Download failed: ${error.message}`);
      }

      // Update recent files and last accessed
      try {
        await supabase.rpc('update_recent_file', { file_uuid: fileId });
        await supabase.rpc('log_file_activity', {
          file_uuid: fileId,
          activity: 'download'
        });
      } catch (recentError) {
        console.warn('Failed to update recent files:', recentError);
      }

      // Create download link
      const url = URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileData.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  };

  const getRecentFiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: recentFiles, error } = await supabase
        .from('recent_files')
        .select(`
          file_id,
          accessed_at,
          files!inner (*)
        `)
        .eq('user_id', user.id)
        .order('accessed_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching recent files:', error);
        return [];
      }

      return (recentFiles || []).map(item => item.files);
    } catch (error) {
      console.error('Error getting recent files:', error);
      return [];
    }
  };

  const getStarredFiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: starredFiles, error } = await supabase
        .from('files')
        .select('*')
        .eq('owner_id', user.id)
        .eq('starred', true)
        .eq('is_deleted', false)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching starred files:', error);
        return [];
      }

      return starredFiles || [];
    } catch (error) {
      console.error('Error getting starred files:', error);
      return [];
    }
  };

  const allItems = section === 'my-drive' ? [...folders, ...files] : files;

  return {
    files: allItems,
    loading,
    error,
    storageUsage,
    uploadFile,
    createFolder,
    deleteFile,
    toggleStar,
    renameFile,
    downloadFile,
    getRecentFiles,
    getStarredFiles,
    refetch: fetchFiles,
  };
}