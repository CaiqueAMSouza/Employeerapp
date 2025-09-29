import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Edit2, Trash2, Users, Mail, Phone, AlertCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  message?: string;
  status?: 'success' | 'error';
  value?: Employee[] | Employee;
}

const API_BASE_URL = 'http://localhost:3030';

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    id: ''
  });

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employee`);
      const data: ApiResponse = await response.json();
      
      if (data.value && Array.isArray(data.value)) {
        setEmployees(data.value);
      } else if (data.status === 'error') {
        toast({
          title: "Erro ao carregar funcionários",
          description: data.message || "Não foi possível carregar a lista de funcionários",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Verifique se o servidor está rodando em http://localhost:3030",
        variant: "destructive"
      });
      console.error('Error loading employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Todos os campos devem ser preenchidos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const url = editingEmployee 
        ? `${API_BASE_URL}/employee/update`
        : `${API_BASE_URL}/employee/create`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();
      
      if (data.status === 'success') {
        toast({
          title: editingEmployee ? "Funcionário atualizado" : "Funcionário cadastrado",
          description: data.message,
          variant: "default"
        });
        
        setIsDialogOpen(false);
        setEditingEmployee(null);
        setFormData({ name: '', email: '', phone: '', id: ''});
        loadEmployees();
      } else {
        toast({
          title: "Erro",
          description: data.message || "Erro ao processar solicitação",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Verifique se o servidor está rodando",
        variant: "destructive"
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      id: String(employee.id)
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employee/remove/${id}`, {
        method: 'POST',
      });

      const data: ApiResponse = await response.json();
      
      if (data.status === 'success') {
        toast({
          title: "Funcionário removido",
          description: data.message,
        });
        loadEmployees();
      } else {
        toast({
          title: "Erro",
          description: data.message || "Erro ao remover funcionário",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Verifique se o servidor está rodando",
        variant: "destructive"
      });
      console.error('Error deleting employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadEmployees();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employee/name/${encodeURIComponent(searchQuery)}`);
      const data: ApiResponse = await response.json();
      
      if (data.value && Array.isArray(data.value)) {
        setEmployees(data.value);
      } else if (data.status === 'error') {
        toast({
          title: "Erro na busca",
          description: data.message || "Erro ao buscar funcionário",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Verifique se o servidor está rodando",
        variant: "destructive"
      });
      console.error('Error searching employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDialog = () => {
    setEditingEmployee(null);
    setFormData({ name: '', email: '', phone: '', id: ''});
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-elegant mb-4">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Sistema de Funcionários
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie os funcionários da sua empresa de forma simples e eficiente
          </p>
        </div>

        {/* Search and Add Section */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Buscar e Gerenciar
            </CardTitle>
            <CardDescription>
              Busque funcionários pelo nome ou adicione novos funcionários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Buscar funcionário pelo nome..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  variant="outline"
                  disabled={isLoading}
                >
                  <Search className="w-4 h-4" />
                </Button>
                {searchQuery && (
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      loadEmployees();
                    }}
                    variant="ghost"
                  >
                    Limpar
                  </Button>
                )}
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Funcionário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingEmployee 
                        ? 'Atualize as informações do funcionário'
                        : 'Adicione um novo funcionário ao sistema'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="id" type="hidden" value={formData.id} />
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Digite o nome completo"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="funcionario@empresa.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    
                    <DialogFooter className="flex gap-2">
                      <Button type="button" variant="outline" onClick={resetDialog}>
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : (editingEmployee ? 'Atualizar' : 'Cadastrar')}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Employees List */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Funcionários Cadastrados
              </span>
              <Badge variant="secondary" className="text-sm">
                {employees.length} {employees.length === 1 ? 'funcionário' : 'funcionários'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Carregando...</span>
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhum funcionário encontrado
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Tente buscar com outro nome ou limpe a busca'
                    : 'Adicione o primeiro funcionário clicando no botão acima'
                  }
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {employees.map((employee) => (
                  <Card key={employee.id} className="shadow-soft hover:shadow-elegant transition-all duration-300 border-border">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg text-foreground">
                              {employee.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              ID: {employee.id}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(employee)}
                              className="h-8 w-8 p-0 hover:bg-primary/10"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja remover <strong>{employee.name}</strong>? 
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(employee.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Remover
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground truncate">
                              {employee.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {employee.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}