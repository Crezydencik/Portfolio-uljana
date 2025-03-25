
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Pencil, 
  Video, 
  BarChart3, 
  Camera, 
  Mic, 
  Languages, 
  Newspaper, 
  PenLine, 
  PenTool, 
  Users,
  Plus,
  Trash2,
  Save,
  X,
  FileEdit
} from 'lucide-react';
import { SkillCategory } from '@/types/project';
import { useSkillsStore } from '@/hooks/useSkillsStore';

// Skill icon options
const skillIcons = [
  { name: 'Pencil', icon: <Pencil size={20} /> },
  { name: 'Video', icon: <Video size={20} /> },
  { name: 'BarChart', icon: <BarChart3 size={20} /> },
  { name: 'Camera', icon: <Camera size={20} /> },
  { name: 'Mic', icon: <Mic size={20} /> },
  { name: 'Newspaper', icon: <Newspaper size={20} /> },
  { name: 'PenLine', icon: <PenLine size={20} /> },
  { name: 'PenTool', icon: <PenTool size={20} /> },
  { name: 'Users', icon: <Users size={20} /> },
];

const AdminSkills = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getSkillCategories, updateSkillCategories } = useSkillsStore();
  
  // Get initial skill data
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(getSkillCategories());
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  
  // For editing a skill
  const [editingSkill, setEditingSkill] = useState<{
    categoryIndex: number;
    skillIndex: number;
    name: string;
    selectedIcon: string;
  } | null>(null);
  
  // For adding a new skill
  const [newSkill, setNewSkill] = useState<{
    categoryIndex: number;
    name: string;
    selectedIcon: string;
  } | null>(null);

  const handleAddCategory = () => {
    if (newCategoryTitle.trim()) {
      setSkillCategories([
        ...skillCategories,
        {
          title: newCategoryTitle,
          skills: []
        }
      ]);
      setNewCategoryTitle('');
      toast({
        title: t('success'),
        description: "Category added successfully"
      });
    }
  };

  const handleRemoveCategory = (index: number) => {
    setSkillCategories(skillCategories.filter((_, i) => i !== index));
    toast({
      title: t('success'),
      description: "Category removed successfully"
    });
  };

  const handleEditSkill = (categoryIndex: number, skillIndex: number, skill: any) => {
    setEditingSkill({
      categoryIndex,
      skillIndex,
      name: skill.name,
      selectedIcon: getIconName(skill.icon) || 'Pencil'
    });
  };

  const handleAddNewSkill = (categoryIndex: number) => {
    setNewSkill({
      categoryIndex,
      name: '',
      selectedIcon: 'Pencil'
    });
  };

  const handleSaveSkill = () => {
    if (editingSkill) {
      const updatedCategories = [...skillCategories];
      updatedCategories[editingSkill.categoryIndex].skills[editingSkill.skillIndex] = {
        name: editingSkill.name,
        icon: getIconComponent(editingSkill.selectedIcon)
      };
      
      setSkillCategories(updatedCategories);
      setEditingSkill(null);
      toast({
        title: t('success'),
        description: "Skill updated successfully"
      });
    }
  };

  const handleAddSkill = () => {
    if (newSkill && newSkill.name.trim()) {
      const updatedCategories = [...skillCategories];
      updatedCategories[newSkill.categoryIndex].skills.push({
        name: newSkill.name,
        icon: getIconComponent(newSkill.selectedIcon)
      });
      
      setSkillCategories(updatedCategories);
      setNewSkill(null);
      toast({
        title: t('success'),
        description: "Skill added successfully"
      });
    }
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...skillCategories];
    updatedCategories[categoryIndex].skills = updatedCategories[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    
    setSkillCategories(updatedCategories);
    toast({
      title: t('success'),
      description: "Skill removed successfully"
    });
  };

  const handleSaveAllSkills = () => {
    updateSkillCategories(skillCategories);
    toast({
      title: t('success'),
      description: "All skills saved successfully"
    });
    navigate('/admin/dashboard');
  };

  // Helper function to get icon name from component
  const getIconName = (iconComponent: React.ReactNode): string | null => {
    for (const icon of skillIcons) {
      // This is a simplified comparison and might not work perfectly
      // A more robust solution would require additional tracking
      if (JSON.stringify(iconComponent) === JSON.stringify(icon.icon)) {
        return icon.name;
      }
    }
    return 'Pencil'; // Default fallback
  };

  // Helper function to get icon component from name
  const getIconComponent = (iconName: string): React.ReactNode => {
    const icon = skillIcons.find(i => i.name === iconName);
    return icon ? icon.icon : <Pencil size={20} />;
  };

  return (
    <AdminLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Edit Skills</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              <X size={16} className="mr-2" /> {t('cancel')}
            </Button>
            <Button onClick={handleSaveAllSkills} className="bg-purple-600 hover:bg-purple-700">
              <Save size={16} className="mr-2" /> {t('saveChanges')}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Add new category */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
                placeholder="Category Title"
              />
              <Button onClick={handleAddCategory} disabled={!newCategoryTitle.trim()}>
                <Plus size={16} className="mr-2" /> Add
              </Button>
            </CardContent>
          </Card>

          {/* Edit existing categories */}
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="animate-on-scroll">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{category.title}</CardTitle>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleRemoveCategory(categoryIndex)}
                >
                  <Trash2 size={16} className="mr-2" /> Remove Category
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center gap-3">
                        <span className="color-gradient">{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditSkill(categoryIndex, skillIndex, skill)}
                        >
                          <FileEdit size={16} className="mr-2" /> Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
                        >
                          <Trash2 size={16} className="mr-2" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => handleAddNewSkill(categoryIndex)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus size={16} className="mr-2" /> Add Skill
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Edit Skill Modal (simplified) */}
        {editingSkill && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Edit Skill</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={editingSkill.name}
                    onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                    placeholder="Skill Name"
                  />
                </div>
                <div>
                  <Label htmlFor="skillIcon">Icon</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {skillIcons.map((icon) => (
                      <Button
                        key={icon.name}
                        type="button"
                        variant={editingSkill.selectedIcon === icon.name ? "default" : "outline"}
                        className={`flex items-center justify-center ${
                          editingSkill.selectedIcon === icon.name ? "bg-purple-600" : ""
                        }`}
                        onClick={() => setEditingSkill({...editingSkill, selectedIcon: icon.name})}
                      >
                        {icon.icon}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditingSkill(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSkill} disabled={!editingSkill.name.trim()}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Add New Skill Modal (simplified) */}
        {newSkill && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Add New Skill</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="newSkillName">Skill Name</Label>
                  <Input
                    id="newSkillName"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                    placeholder="Skill Name"
                  />
                </div>
                <div>
                  <Label htmlFor="newSkillIcon">Icon</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {skillIcons.map((icon) => (
                      <Button
                        key={icon.name}
                        type="button"
                        variant={newSkill.selectedIcon === icon.name ? "default" : "outline"}
                        className={`flex items-center justify-center ${
                          newSkill.selectedIcon === icon.name ? "bg-purple-600" : ""
                        }`}
                        onClick={() => setNewSkill({...newSkill, selectedIcon: icon.name})}
                      >
                        {icon.icon}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setNewSkill(null)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
                  Add Skill
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
