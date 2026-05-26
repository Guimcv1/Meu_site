import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import BorderGlow from '../components/BorderGlow';
import { useTheme } from '../contexts/ThemeContext';

const projectsData = [
  {
    title: 'Projeto Senai',
    description: 'Sistema de monitoramento e gestão de chaves e objetos das salas e blocos do Senai. Foco em otimizar o controle interno e evitar perdas.',
    tags: ['C#', 'Gestão', 'Desktop'],
    repo: 'https://github.com/Guimcv1/Projeto-Senai',
    status: 'Finalizado',
    image: '/projeto-1.png'
  },
  {
    title: 'Sell-Manager-SGU',
    description: 'Plataforma para gerenciamento de vendas. Permite controle de fluxo, acompanhamento de métricas e organização de produtos.',
    tags: ['Python', 'Gestão', 'Backend'],
    repo: 'https://github.com/Guimcv1/Sell-Manager-SGU',
    status: 'Finalizado',
    image: '/projeto-2.png'
  },
  {
    title: 'EchoDE - App Sustentável',
    description: 'Aplicativo React Native para monitoramento de consumo sustentável (energia, água, materiais). Atuei como Front-end e UI/UX Developer na startup acadêmica EchoDE.',
    tags: ['React Native', 'Mobile', 'UI/UX'],
    repo: 'https://github.com/NunesDevelloper/ProjetoDs',
    status: 'Em Destaque',
    image: '/Echode.png'
  },
  {
    title: 'Hakathon Project',
    description: 'Solução desenvolvida rapidamente durante uma maratona de programação. Foco em resolver um problema específico com interface amigável.',
    tags: ['JavaScript', 'React', 'Frontend'],
    repo: 'https://github.com/Guimcv1/Hakathon',
    status: 'Destaque',
    image: '/projeto-4.png'
  }
];

const Projects = () => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Meus <span className="text-salmon">Projetos</span></h2>
        <p className="text-gray-500 dark:text-gray-400">Alguns dos meus trabalhos recentes e repositórios open-source.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col h-full"
          >
            <BorderGlow 
              className="h-full"
              backgroundColor={isDark ? '#000000' : '#ffffff'}
              glowColor={isDark ? '217 91 60' : '350 35 60'}
              colors={isDark ? ['#1e3a8a', '#3b82f6', '#60a5fa'] : ['#E8B4B8', '#C07C88', '#9B5966']}
              animated={true}
            >
              <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-transparent dark:hover:border-transparent transition-all duration-300 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Imagem do Projeto */}
                  <div className="w-full sm:w-2/5 bg-gray-50 dark:bg-gray-800">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 sm:h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/f9fafb/fa8072?text=Projeto'; }}
                    />
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="w-full sm:w-3/5 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-salmon/10 text-salmon rounded-full border border-salmon/20">
                        {project.status}
                      </span>
                      <div className="flex gap-3 text-gray-400">
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors z-20">
                            <FaGithub className="w-5 h-5" />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors z-20">
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-salmon transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-1 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-600 dark:text-gray-300 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
