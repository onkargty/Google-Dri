import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Search, 
  Grid3X3, 
  List, 
  MoreVertical, 
  Download, 
  Trash2, 
  Share2, 
  Star, 
  FolderPlus, 
  File, 
  Folder, 
  Image, 
  FileText, 
  Music, 
  Video,
  Archive,
  Code,
  Settings,
  User,
  Bell,
  Plus,
  Eye,
  Edit3,
  Copy,
  Move,
  Clock,
  Filter,
  Home,
  Trash,
  Users,
  Cloud,
  LogOut,
  X,
  Mail,
  Check,
  AlertCircle,
  ChevronRight,
  Menu,
  Zap,
  HardDrive
} from 'lucide-react';
import { useFiles } from '../hooks/useFiles';
import { useAuth } from '../hooks/useAuth';
import { FileItem, ViewMode, SortBy } from '../types';

type NavigationSection = 'my-drive' | 'recent' | 'starred' | 'shared' | 'trash';

export function FileManager() {
  const { user, signOut } = useAuth();
  const [currentSection, setCurrentSection] = useState<NavigationSection>('my-drive');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<Array<{id: string | null, name: string}>>([{id: null, name: 'My Drive'}]);
  const { files, loading, storageUsage, uploadFile, createFolder, deleteFile, toggleStar, renameFile, downloadFile, error, getRecentFiles, getStarredFiles } = useFiles(currentFolderId, currentSection);
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [uploadProgress, setUploadProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFileForAction, setSelectedFileForAction] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; fileId: string } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(true);
    setErrorMessage(null);
    
    console.log('Starting file upload, current folder:', currentFolderId, 'section:', currentSection);
    
    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        console.log(`Uploading file ${index + 1}/${files.length}:`, file.name);
        return await uploadFile(file, currentSection === 'my-drive' ? currentFolderId : null);
      });
      
      await Promise.all(uploadPromises);
      setShowUploadModal(false);
      console.log('All files uploaded successfully');
    } catch (error: any) {
      console.error('File upload failed:', error);
      setErrorMessage(error.message || 'Failed to upload files');
    } finally {
      setUploadProgress(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    
    setErrorMessage(null);
    try {
      await createFolder(newFolderName, currentSection === 'my-drive' ? currentFolderId : null);
      setShowNewFolderModal(false);
      setNewFolderName('');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to create folder');
    }
  };

  const handleRename = async () => {
    if (!selectedFileForAction || !renameValue.trim()) return;
    
    setErrorMessage(null);
    try {
      const file = files.find(f => f.id === selectedFileForAction);
      await renameFile(selectedFileForAction, renameValue, file?.type === 'folder');
      setShowRenameModal(false);
      setRenameValue('');
      setSelectedFileForAction(null);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to rename file');
    }
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return <Folder className="w-6 h-6 text-blue-500" />;
    
    if (file.mime_type) {
      if (file.mime_type.startsWith('image/')) return <Image className="w-6 h-6 text-green-500" />;
      if (file.mime_type.startsWith('video/')) return <Video className="w-6 h-6 text-red-500" />;
      if (file.mime_type.startsWith('audio/')) return <Music className="w-6 h-6 text-purple-500" />;
      if (file.mime_type.includes('pdf')) return <FileText className="w-6 h-6 text-red-600" />;
      if (file.mime_type.includes('zip') || file.mime_type.includes('archive')) return <Archive className="w-6 h-6 text-orange-500" />;
      if (file.mime_type.includes('code') || file.mime_type.includes('javascript') || file.mime_type.includes('html')) return <Code className="w-6 h-6 text-blue-600" />;
    }
    
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }
    
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'modified':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      case 'size':
        return b.size - a.size;
      case 'type':
        return (a.mime_type || '').localeCompare(b.mime_type || '');
      default:
        return 0;
    }
  });

  const handleFileClick = (file: FileItem, isDoubleClick: boolean = false) => {
    if (isDoubleClick) {
      if (file.type === 'folder') {
        setCurrentFolderId(file.id);
        setFolderPath(prev => [...prev, {id: file.id, name: file.name}]);
        setCurrentSection('my-drive');
      } else {
        downloadFile(file.id).catch(error => {
          setErrorMessage(error.message || 'Failed to download file');
        });
      }
    } else {
      setSelectedFiles([file.id]);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const navigateToFolder = (folderId: string | null, folderName: string) => {
    const targetIndex = folderPath.findIndex(f => f.id === folderId);
    if (targetIndex !== -1) {
      setFolderPath(folderPath.slice(0, targetIndex + 1));
    }
    setCurrentFolderId(folderId);
    setCurrentSection('my-drive');
  };

  const handleSectionChange = (section: NavigationSection) => {
    setCurrentSection(section);
    setCurrentFolderId(null);
    setSelectedFiles([]);
    
    switch (section) {
      case 'my-drive':
        setFolderPath([{id: null, name: 'My Drive'}]);
        break;
      case 'recent':
        setFolderPath([{id: null, name: 'Recent'}]);
        break;
      case 'starred':
        setFolderPath([{id: null, name: 'Starred'}]);
        break;
      case 'shared':
        setFolderPath([{id: null, name: 'Shared with me'}]);
        break;
      case 'trash':
        setFolderPath([{id: null, name: 'Trash'}]);
        break;
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'my-drive': return currentFolderId ? folderPath[folderPath.length - 1]?.name : 'My Drive';
      case 'recent': return 'Recent';
      case 'starred': return 'Starred';
      case 'shared': return 'Shared with me';
      case 'trash': return 'Trash';
      default: return 'My Drive';
    }
  };

  const storagePercentage = (storageUsage.used_bytes / storageUsage.total_bytes) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-72'} bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl flex flex-col transition-all duration-300`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CloudDrive</h1>}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="p-6">
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New</span>
            </button>
          </div>
        )}

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <button 
              onClick={() => handleSectionChange('my-drive')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentSection === 'my-drive' 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <Home className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">My Drive</span>}
            </button>
            
            <button 
              onClick={() => handleSectionChange('recent')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentSection === 'recent' 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <Clock className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Recent</span>}
            </button>
            
            <button 
              onClick={() => handleSectionChange('starred')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentSection === 'starred' 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <Star className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Starred</span>}
            </button>
            
            <button 
              onClick={() => handleSectionChange('shared')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentSection === 'shared' 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <Users className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Shared</span>}
            </button>
            
            <button 
              onClick={() => handleSectionChange('trash')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentSection === 'trash' 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <Trash className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Trash</span>}
            </button>
          </div>

          {!sidebarCollapsed && (
            <div className="mt-8">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Storage
              </div>
              <div className="mt-4 px-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <HardDrive className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-800">Storage Usage</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{formatFileSize(storageUsage.used_bytes)}</span>
                    <span>of {formatFileSize(storageUsage.total_bytes)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{storageUsage.file_count} files • {storagePercentage.toFixed(1)}% used</p>
                </div>
              </div>
            </div>
          )}
        </nav>

        {!sidebarCollapsed && (
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.email}</p>
                <p className="text-xs text-gray-500">Premium Account</p>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 flex-1">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files and folders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-gray-50/80 border border-gray-200/50 rounded-2xl focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        {currentSection === 'my-drive' && folderPath.length > 1 && (
          <div className="px-8 py-4 bg-white/60 backdrop-blur-sm border-b border-gray-100">
            <nav className="flex items-center space-x-2 text-sm">
              {folderPath.map((crumb, index) => (
                <React.Fragment key={crumb.id || 'root'}>
                  {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                  <button
                    onClick={() => navigateToFolder(crumb.id, crumb.name)}
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors font-medium"
                  >
                    {crumb.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}

        {/* Section Header */}
        <div className="px-8 py-6 bg-white/60 backdrop-blur-sm border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-800">{getSectionTitle()}</h2>
              {files.length > 0 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {files.length} items
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-100 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-3 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="text-sm bg-transparent border-none focus:outline-none text-gray-700 font-medium"
                >
                  <option value="name">Name</option>
                  <option value="modified">Modified</option>
                  <option value="size">Size</option>
                  <option value="type">Type</option>
                </select>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 rounded-xl p-4 border border-blue-200">
              <span className="text-blue-700 font-medium">{selectedFiles.length} item{selectedFiles.length > 1 ? 's' : ''} selected</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    selectedFiles.forEach(fileId => {
                      downloadFile(fileId).catch(error => {
                        setErrorMessage(error.message || 'Failed to download file');
                      });
                    });
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    selectedFiles.forEach(fileId => {
                      const file = files.find(f => f.id === fileId);
                      deleteFile(fileId, file?.type === 'folder').catch(error => {
                        setErrorMessage(error.message || 'Failed to delete file');
                      });
                    });
                    setSelectedFiles([]);
                  }}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {(error || errorMessage) && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">{error || errorMessage}</span>
              <button 
                onClick={() => setErrorMessage(null)}
                className="ml-auto text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* File Grid/List */}
        <div className="flex-1 p-8 overflow-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Loading your files...</p>
            </div>
          ) : sortedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                {currentSection === 'recent' && <Clock className="w-12 h-12 text-blue-500" />}
                {currentSection === 'starred' && <Star className="w-12 h-12 text-yellow-500" />}
                {currentSection === 'shared' && <Users className="w-12 h-12 text-green-500" />}
                {currentSection === 'trash' && <Trash className="w-12 h-12 text-red-500" />}
                {currentSection === 'my-drive' && <Folder className="w-12 h-12 text-blue-500" />}
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {currentSection === 'recent' && 'No recent files'}
                {currentSection === 'starred' && 'No starred files'}
                {currentSection === 'shared' && 'No shared files'}
                {currentSection === 'trash' && 'Trash is empty'}
                {currentSection === 'my-drive' && 'No files or folders'}
              </p>
              <p className="text-gray-500 text-center max-w-md">
                {currentSection === 'recent' && 'Files you\'ve recently accessed will appear here'}
                {currentSection === 'starred' && 'Star files to quickly find them later'}
                {currentSection === 'shared' && 'Files shared with you will appear here'}
                {currentSection === 'trash' && 'Deleted files will be stored here for 30 days'}
                {currentSection === 'my-drive' && 'Upload files or create folders to get started'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {sortedFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFileClick(file, false);
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFileClick(file, true);
                  }}
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl ${
                    selectedFiles.includes(file.id)
                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200 hover:bg-white shadow-sm'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      {file.type === 'folder' ? (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                          <Folder className="w-8 h-8 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                          {getFileIcon(file)}
                        </div>
                      )}
                      {file.shared && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-center w-full">
                      <p className="text-sm font-semibold text-gray-800 truncate w-full mb-1" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(file.updated_at)}</p>
                      {file.type === 'file' && (
                        <p className="text-xs text-gray-400 mt-1">{formatFileSize(file.size)}</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(file.id).catch(error => {
                        setErrorMessage(error.message || 'Failed to toggle star');
                      });
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                      file.starred 
                        ? 'text-yellow-500 bg-yellow-50 opacity-100' 
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${file.starred ? 'fill-current' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Owner</th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Modified</th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Size</th>
                    <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedFiles.map((file) => (
                    <tr
                      key={file.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFileClick(file, false);
                      }}
                      onDoubleClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFileClick(file, true);
                      }}
                      onContextMenu={(e) => handleContextMenu(e, file.id)}
                      className={`cursor-pointer transition-all duration-200 hover:bg-blue-50/50 ${
                        selectedFiles.includes(file.id) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getFileIcon(file)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-900 truncate">{file.name}</span>
                              {file.shared && <Users className="w-4 h-4 text-green-500" />}
                              {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-600 font-medium">You</td>
                      <td className="px-8 py-4 text-sm text-gray-600">{formatDate(file.updated_at)}</td>
                      <td className="px-8 py-4 text-sm text-gray-600">{formatFileSize(file.size)}</td>
                      <td className="px-8 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContextMenu(e, file.id);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Create New</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {uploadProgress && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-5 h-5 border-2 border-blue-200 rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-5 h-5 border-2 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                  <span className="text-sm text-blue-800 font-medium">Uploading files...</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadProgress}
                className="w-full flex items-center space-x-4 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Upload className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Upload Files</div>
                  <div className="text-sm text-gray-500">Choose files from your device</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setShowNewFolderModal(true);
                }}
                disabled={uploadProgress || currentSection !== 'my-drive'}
                className="w-full flex items-center space-x-4 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FolderPlus className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">New Folder</div>
                  <div className="text-sm text-gray-500">Organize your files</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">New Folder</h3>
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName('');
                }}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Folder Name</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName('');
                }}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Rename Item</h3>
              <button
                onClick={() => {
                  setShowRenameModal(false);
                  setRenameValue('');
                  setSelectedFileForAction(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Name</label>
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="Enter new name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRenameModal(false);
                  setRenameValue('');
                  setSelectedFileForAction(null);
                }}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                disabled={!renameValue.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-lg"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl py-2 z-50 min-w-48"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button 
            onClick={() => {
              const file = files.find(f => f.id === contextMenu.fileId);
              if (file && file.type === 'file') {
                downloadFile(contextMenu.fileId).catch(error => {
                  setErrorMessage(error.message || 'Failed to download file');
                });
              }
              closeContextMenu();
            }}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button 
            onClick={() => {
              const file = files.find(f => f.id === contextMenu.fileId);
              if (file) {
                setSelectedFileForAction(contextMenu.fileId);
                setRenameValue(file.name);
                setShowRenameModal(true);
              }
              closeContextMenu();
            }}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors font-medium"
          >
            <Edit3 className="w-4 h-4" />
            <span>Rename</span>
          </button>
          <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors font-medium">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors font-medium">
            <Copy className="w-4 h-4" />
            <span>Make a copy</span>
          </button>
          <hr className="my-2 border-gray-200" />
          <button
            onClick={() => {
              toggleStar(contextMenu.fileId).catch(error => {
                setErrorMessage(error.message || 'Failed to toggle star');
              });
              closeContextMenu();
            }}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-yellow-50 flex items-center space-x-3 transition-colors font-medium"
          >
            <Star className="w-4 h-4" />
            <span>{files.find(f => f.id === contextMenu.fileId)?.starred ? 'Remove star' : 'Add star'}</span>
          </button>
          <button
            onClick={() => {
              const file = files.find(f => f.id === contextMenu.fileId);
              deleteFile(contextMenu.fileId, file?.type === 'folder').catch(error => {
                setErrorMessage(error.message || 'Failed to delete');
              });
              closeContextMenu();
            }}
            className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Click outside to close context menu */}
      {contextMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeContextMenu}
        />
      )}
    </div>
  );
}