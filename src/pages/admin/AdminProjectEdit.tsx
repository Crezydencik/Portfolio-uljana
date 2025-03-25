
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useProjectStore } from '@/hooks/useProjectStore';
import { VideoItem, Project } from '@/types/project';
import { useToast } from '@/hooks/use-toast';
import {
  Save,
  X,
  Home,
  Plus,
  Trash2,
  ArrowLeft,
  FilePlus,
  Film,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import RichTextEditor from '@/components/RichTextEditor';

const AdminProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const isNewProject = id === 'new';
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getProject, addProject, updateProject, getAllProjects } = useProjectStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const videoThumbnailInputRef = useRef<HTMLInputElement>(null);

  // Default empty project
  const emptyProject: Project = {
    id: '',
    title: '',
    category: '',
    author: '',
    date: '',
    image: '',
    content: '',
    mediaType: [],
    imageFile: null,
    photoFiles: []
  };

  const [project, setProject] = useState<Project>(emptyProject);
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [newPhoto, setNewPhoto] = useState('');
  const [newVideo, setNewVideo] = useState<VideoItem>({
    thumbnail: '',
    title: '',
    duration: ''
  });

  // Get all projects for selection
  const allProjects = getAllProjects();
  const [selectedRelatedProjects, setSelectedRelatedProjects] = useState<string[]>([]);

  useEffect(() => {
    if (!isNewProject && id) {
      const existingProject = getProject(id);
      if (existingProject) {
        setProject(existingProject);
        setPhotos(existingProject.photos || []);
        setVideos(existingProject.videos || []);
        setSelectedRelatedProjects(existingProject.relatedProjects || []);
      } else {
        toast({
          title: 'Error',
          description: 'Project not found',
          variant: 'destructive'
        });
        navigate('/admin/dashboard');
      }
    }
  }, [id, isNewProject, getProject, toast, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setProject(prev => ({ ...prev, content }));
  };

  const handleMediaTypeChange = (type: 'photo' | 'video') => {
    setProject(prev => {
      const mediaType = [...(prev.mediaType || [])];
      
      // Toggle the media type
      if (mediaType.includes(type)) {
        return {
          ...prev,
          mediaType: mediaType.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          mediaType: [...mediaType, type]
        };
      }
    });
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      setProject(prev => ({
        ...prev,
        image: imageUrl,
        imageFile: file
      }));
      
      toast({
        title: 'Image Selected',
        description: `File: ${file.name}`
      });
    }
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      
      setPhotos(prev => [...prev, ...newPhotos]);
      setProject(prev => ({
        ...prev,
        photoFiles: [...(prev.photoFiles || []), ...Array.from(e.target.files as FileList)]
      }));
      
      // Ensure 'photo' is in mediaType
      if (!project.mediaType?.includes('photo')) {
        handleMediaTypeChange('photo');
      }
      
      toast({
        title: 'Photos Selected',
        description: `${e.target.files.length} files selected`
      });
    }
  };

  const handleVideoThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const thumbnailUrl = URL.createObjectURL(file);
      
      setNewVideo(prev => ({
        ...prev,
        thumbnail: thumbnailUrl
      }));
      
      toast({
        title: 'Thumbnail Selected',
        description: `File: ${file.name}`
      });
    }
  };

  const addPhotoToProject = () => {
    if (newPhoto && !photos.includes(newPhoto)) {
      setPhotos([...photos, newPhoto]);
      setNewPhoto('');
      
      // Ensure 'photo' is in mediaType
      if (!project.mediaType?.includes('photo')) {
        handleMediaTypeChange('photo');
      }
    }
  };

  const removePhotoFromProject = (photoUrl: string) => {
    setPhotos(photos.filter(p => p !== photoUrl));
    
    // If no photos are left, remove 'photo' from mediaType
    if (photos.length <= 1) {
      setProject(prev => ({
        ...prev,
        mediaType: (prev.mediaType || []).filter(t => t !== 'photo')
      }));
    }
  };

  const addVideoToProject = () => {
    if (newVideo.thumbnail && newVideo.title && newVideo.duration) {
      setVideos([...videos, { ...newVideo }]);
      setNewVideo({
        thumbnail: '',
        title: '',
        duration: ''
      });
      
      // Ensure 'video' is in mediaType
      if (!project.mediaType?.includes('video')) {
        handleMediaTypeChange('video');
      }
    }
  };

  const removeVideoFromProject = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
    
    // If no videos are left, remove 'video' from mediaType
    if (videos.length <= 1) {
      setProject(prev => ({
        ...prev,
        mediaType: (prev.mediaType || []).filter(t => t !== 'video')
      }));
    }
  };

  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVideo(prev => ({ ...prev, [name]: value }));
  };

  const handleRelatedProjectToggle = (projectId: string) => {
    setSelectedRelatedProjects(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!project.id || !project.title) {
      toast({
        title: 'Validation Error',
        description: 'Project ID and title are required',
        variant: 'destructive'
      });
      return;
    }

    // Prepare the complete project object
    const completeProject: Project = {
      ...project,
      photos: photos.length > 0 ? photos : undefined,
      videos: videos.length > 0 ? videos : undefined,
      relatedProjects: selectedRelatedProjects.length > 0 ? selectedRelatedProjects : undefined
    };

    if (isNewProject) {
      addProject(completeProject);
      toast({
        title: 'Success',
        description: 'Project has been created'
      });
    } else {
      updateProject(completeProject);
      toast({
        title: 'Success',
        description: 'Project has been updated'
      });
    }

    navigate('/admin/dashboard');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-purple-600 flex items-center">
            <Home size={20} className="mr-2" /> {t('home')}
          </Link>
          <h1 className="text-xl font-semibold">
            {isNewProject ? t('addProject') : t('editProject')}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            <X size={16} className="mr-2" /> {t('cancel')}
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save size={16} className="mr-2" /> {t('save')}
          </Button>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto py-8 px-4">
        <Link to="/admin/dashboard" className="flex items-center text-gray-600 hover:text-purple-600 mb-6">
          <ArrowLeft size={16} className="mr-2" /> {t('adminDashboard')}
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="id">{t('projectId')}</Label>
                <Input
                  id="id"
                  name="id"
                  value={project.id}
                  onChange={handleInputChange}
                  placeholder="project-unique-id"
                  required
                />
                {isNewProject && (
                  <p className="text-xs text-gray-500 mt-1">
                    Use lowercase letters, numbers and hyphens only
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="title">{t('title')}</Label>
                <Input
                  id="title"
                  name="title"
                  value={project.title}
                  onChange={handleInputChange}
                  placeholder="Project Title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">{t('category')}</Label>
                <Input
                  id="category"
                  name="category"
                  value={project.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="author">{t('author')}</Label>
                <Input
                  id="author"
                  name="author"
                  value={project.author}
                  onChange={handleInputChange}
                  placeholder="Author"
                />
              </div>

              <div>
                <Label htmlFor="date">{t('date')}</Label>
                <Input
                  id="date"
                  name="date"
                  value={project.date}
                  onChange={handleInputChange}
                  placeholder="Date (e.g. January 10, 2023)"
                />
              </div>

              <div>
                <Label htmlFor="image">{t('image')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    value={project.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                  />
                  <Button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                  >
                    <Upload size={16} className="mr-2" /> {t('uploadImage')}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleMainImageUpload}
                  />
                </div>
                {project.image && (
                  <div className="mt-2">
                    <img 
                      src={project.image} 
                      alt="Preview" 
                      className="h-20 object-cover rounded border" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="content">{t('projectContent')}</Label>
            <RichTextEditor
              value={project.content}
              onChange={handleContentChange}
              placeholder="Content of the project"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can format the content using the toolbar above
            </p>
          </div>

          <div className="mb-6">
            <Label className="mb-2 block">Media Type</Label>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={project.mediaType?.includes('photo') ? 'default' : 'outline'}
                className={project.mediaType?.includes('photo') ? 'bg-purple-600 hover:bg-purple-700' : ''}
                onClick={() => handleMediaTypeChange('photo')}
              >
                <ImageIcon size={16} className="mr-2" /> {t('photo')}
              </Button>
              <Button
                type="button"
                variant={project.mediaType?.includes('video') ? 'default' : 'outline'}
                className={project.mediaType?.includes('video') ? 'bg-red-600 hover:bg-red-700' : ''}
                onClick={() => handleMediaTypeChange('video')}
              >
                <Film size={16} className="mr-2" /> {t('video')}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="photos" className="flex items-center">
                <ImageIcon size={16} className="mr-2" /> Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center">
                <Film size={16} className="mr-2" /> Videos
              </TabsTrigger>
              <TabsTrigger value="related" className="flex items-center">
                Related Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Photo URL"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                />
                <Button 
                  type="button" 
                  onClick={addPhotoToProject}
                  disabled={!newPhoto}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus size={16} className="mr-2" /> {t('addPhoto')}
                </Button>
                <Button 
                  type="button" 
                  onClick={() => photoFileInputRef.current?.click()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Upload size={16} className="mr-2" /> {t('uploadPhoto')}
                </Button>
                <input
                  type="file"
                  ref={photoFileInputRef}
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoFileUpload}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {photos.map((photo, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <img 
                        src={photo} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                        }}
                      />
                    </div>
                    <CardFooter className="p-2 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removePhotoFromProject(photo)}
                        className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                {photos.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                    <FilePlus size={48} className="mb-2 text-gray-400" />
                    <p>No photos added yet</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('addVideo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="thumbnail">{t('thumbnailUrl')}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="thumbnail"
                        name="thumbnail"
                        value={newVideo.thumbnail}
                        onChange={handleVideoInputChange}
                        placeholder="Thumbnail URL"
                      />
                      <Button 
                        type="button" 
                        onClick={() => videoThumbnailInputRef.current?.click()}
                        className="bg-red-600 hover:bg-red-700 whitespace-nowrap"
                      >
                        <Upload size={16} className="mr-2" /> Upload
                      </Button>
                      <input
                        type="file"
                        ref={videoThumbnailInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleVideoThumbnailUpload}
                      />
                    </div>
                    {newVideo.thumbnail && (
                      <div className="mt-2">
                        <img 
                          src={newVideo.thumbnail} 
                          alt="Thumbnail Preview" 
                          className="h-20 object-cover rounded border" 
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="videoTitle">{t('videoTitle')}</Label>
                    <Input
                      id="videoTitle"
                      name="title"
                      value={newVideo.title}
                      onChange={handleVideoInputChange}
                      placeholder="Video Title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">{t('duration')}</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={newVideo.duration}
                      onChange={handleVideoInputChange}
                      placeholder="Duration (e.g. 3:42)"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="button" 
                    onClick={addVideoToProject}
                    disabled={!newVideo.thumbnail || !newVideo.title || !newVideo.duration}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus size={16} className="mr-2" /> {t('addVideo')}
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {videos.map((video, index) => (
                  <Card key={index}>
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                        }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeVideoFromProject(index)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={16} className="mr-2" /> {t('delete')}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                {videos.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                    <Film size={48} className="mb-2 text-gray-400" />
                    <p>No videos added yet</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Related Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allProjects
                      .filter(p => p.id !== id) // Don't show current project
                      .map(relatedProject => (
                        <div 
                          key={relatedProject.id} 
                          className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                            selectedRelatedProjects.includes(relatedProject.id) 
                              ? 'ring-2 ring-purple-600' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => handleRelatedProjectToggle(relatedProject.id)}
                        >
                          <div className="aspect-video bg-gray-100 relative">
                            <img 
                              src={relatedProject.image} 
                              alt={relatedProject.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-sm truncate">{relatedProject.title}</h3>
                            <p className="text-xs text-gray-500">{relatedProject.category}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {allProjects.length <= 1 && (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <p>No other projects available to relate to</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminProjectEdit;
