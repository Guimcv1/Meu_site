import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Box, Code, Layers, Download, Sparkles } from 'lucide-react';
import BorderGlow from '../components/BorderGlow';
import ThreeViewer from '../components/ThreeViewer';
import { useTheme } from '../contexts/ThemeContext';

const projectsData = [
  // 3D Engineering & Modeling Projects (STL Models)
  {
    title: 'Braço Robótico Articulado',
    description: 'Modelagem 3D de um braço robótico com juntas articuladas desenvolvido para automação industrial e robótica.',
    tags: ['Fusion 360', 'Modelagem 3D', 'Robótica', 'STL'],
    status: 'Modelo 3D',
    type: '3d',
    stlModel: '/3dModels/BRAÇO_ROBOTICO.stl',
    modelColor: '#3b82f6',
    image: '/projeto-3.png'
  },
  {
    title: 'Carro F1 in Schools - Lobo Da Ninde (2023/2024)',
    description: 'Carro de competição projetado para a F1 in Schools nos anos de 2023 e 2024 pela equipe Lobo Da Ninde. Desenvolvimento de superfícies aerodinâmicas e engenharia paramétrica.',
    tags: ['F1 in Schools', 'Lobo Da Ninde', '2023/2024', 'Fusion 360', 'STL'],
    status: 'Modelo 3D',
    type: '3d',
    stlModel: '/3dModels/CarroCompleto+F3D.stl',
    modelColor: '#f43f5e',
    image: '/projeto-3.png'
  },
  {
    title: 'Prototipagem Drone Solaris',
    description: 'Projeto tridimensional de chassi e suporte aerodinâmico para drone de alto desempenho e voo estável.',
    tags: ['Maya', 'Fusion 360', 'Drone', 'STL'],
    status: 'Modelo 3D',
    type: '3d',
    stlModel: '/3dModels/Solaris.stl',
    modelColor: '#10b981',
    image: '/projeto-3.png'
  },
  {
    title: 'Bueiro Pluvial Três vias',
    description: 'Projeto de infraestrutura e hidráulica civil com modelagem de galerias de drenagem pluvial e bueiro.',
    tags: ['AutoCAD', 'Engenharia Civil', 'BIM', 'STL'],
    status: 'Modelo 3D',
    type: '3d',
    stlModel: '/3dModels/Bueiro de Três.stl',
    modelColor: '#8b5cf6',
    image: '/projeto-3.png'
  },
  {
    title: 'Disparador Eletrônico de Foguete (MOBFOG)',
    description: 'Disparador eletrônico desenvolvido para o lançamento seguro e preciso de foguetes na MOBFOG (Mostra Brasileira de Foguetes).',
    tags: ['MOBFOG', 'Disparador Eletrônico', 'Foguetes', 'Prototipagem 3D', 'STL'],
    status: 'Modelo 3D',
    type: '3d',
    stlModel: '/3dModels/Samuel+disparador.stl',
    modelColor: '#f59e0b',
    image: '/projeto-3.png'
  },
  // Software Projects
  {
    title: 'Projeto Senai',
    description: 'Sistema de monitoramento e gestão de chaves e objetos das salas e blocos do Senai. Foco em otimizar o controle interno e evitar perdas.',
    tags: ['C#', 'Gestão', 'Desktop'],
    repo: 'https://github.com/Guimcv1/Projeto-Senai',
    status: 'Finalizado',
    type: 'software',
    image: '/projeto-1.png'
  },
  {
    title: 'Sell-Manager-SGU',
    description: 'Plataforma para gerenciamento de vendas. Permite controle de fluxo, acompanhamento de métricas e organização de produtos.',
    tags: ['Python', 'Gestão', 'Backend'],
    repo: 'https://github.com/Guimcv1/Sell-Manager-SGU',
    status: 'Finalizado',
    type: 'software',
    image: '/projeto-2.png'
  },
  {
    title: 'EchoDE - App Sustentável',
    description: 'Aplicativo React Native para monitoramento de consumo sustentável (energia, água, materiais). Atuei como Front-end e UI/UX Developer na startup acadêmica EchoDE.',
    tags: ['React Native', 'Mobile', 'UI/UX'],
    repo: 'https://github.com/NunesDevelloper/ProjetoDs',
    status: 'Em Destaque',
    type: 'software',
    image: '/Echode.png'
  },
  {
    title: 'Hakathon Project',
    description: 'Solução desenvolvida rapidamente durante uma maratona de programação. Foco em resolver um problema específico com interface amigável.',
    tags: ['JavaScript', 'React', 'Frontend'],
    repo: 'https://github.com/Guimcv1/Hakathon',
    status: 'Destaque',
    type: 'software',
    image: '/projeto-4.png'
  }
];

const Projects = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [active3DModel, setActive3DModel] = useState({});

  const filteredProjects = projectsData.filter(project => {
    if (activeTab === '3d') return project.type === '3d';
    if (activeTab === 'software') return project.type === 'software';
    return true;
  });

  const toggle3DView = (index) => {
    setActive3DModel(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Meus <span className="text-salmon">Projetos & Trabalhos</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore meus repositórios de software e interaja com os modelos 3D de engenharia diretamente no navegador.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${
            activeTab === 'all'
              ? 'bg-salmon text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-salmon'
          }`}
        >
          <Layers className="w-4 h-4" />
          Todos ({projectsData.length})
        </button>

        <button
          onClick={() => setActiveTab('3d')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${
            activeTab === '3d'
              ? 'bg-salmon text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-salmon'
          }`}
        >
          <Box className="w-4 h-4" />
          Modelos 3D STL ({projectsData.filter(p => p.type === '3d').length})
        </button>

        <button
          onClick={() => setActiveTab('software')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${
            activeTab === 'software'
              ? 'bg-salmon text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-salmon'
          }`}
        >
          <Code className="w-4 h-4" />
          Sistemas & Web ({projectsData.filter(p => p.type === 'software').length})
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, i) => {
          const is3DViewActive = active3DModel[i] || project.type === '3d';

          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full"
            >
              <BorderGlow 
                className="h-full"
                backgroundColor={isDark ? '#090d16' : '#ffffff'}
                glowColor={isDark ? '217 91 60' : '350 35 60'}
                colors={isDark ? ['#1e3a8a', '#3b82f6', '#60a5fa'] : ['#E8B4B8', '#C07C88', '#9B5966']}
                animated={true}
              >
                <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col h-full">
                  
                  {/* Top Media: 3D Canvas or Image */}
                  <div className="w-full relative">
                    {project.stlModel && is3DViewActive ? (
                      <ThreeViewer 
                        stlUrl={project.stlModel} 
                        title={project.title}
                        color={project.modelColor || '#3b82f6'}
                        height="280px"
                      />
                    ) : (
                      <div className="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/f9fafb/fa8072?text=Projeto'; }}
                        />
                        {project.stlModel && (
                          <button
                            onClick={() => toggle3DView(i)}
                            className="absolute bottom-3 right-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md hover:bg-blue-500 transition-colors"
                          >
                            <Box className="w-4 h-4" />
                            Abrir Viewer 3D Interativo
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        project.type === '3d' 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                          : 'bg-salmon/10 text-salmon border-salmon/20'
                      }`}>
                        {project.status}
                      </span>

                      <div className="flex gap-3 text-gray-400">
                        {project.repo && (
                          <a 
                            href={project.repo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-gray-900 dark:hover:text-white transition-colors"
                            title="Ver repositório no GitHub"
                          >
                            <FaGithub className="w-5 h-5" />
                          </a>
                        )}
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-gray-900 dark:hover:text-white transition-colors"
                            title="Ver demonstração"
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-salmon transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, j) => (
                        <span 
                          key={j} 
                          className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 rounded-md text-gray-600 dark:text-gray-300 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
