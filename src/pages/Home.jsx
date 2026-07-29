import BlurText from '../components/BlurText';
import { LogoLoop } from '../components/LogoLoop';
import AnimatedButton from '../components/AnimatedButton';
import ThreeViewer from '../components/ThreeViewer';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { Download, Box, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProjects = [
  {
    title: 'Projeto Senai',
    description: 'Gestão de chaves e objetos das salas e blocos do Senai. Desenvolvido em C# para controle interno e otimização.',
    tags: ['C#', 'Gestão', 'Desktop'],
    repo: 'https://github.com/Guimcv1/Projeto-Senai'
  },
  {
    title: 'Carro F1 in Schools - Lobo Canindé',
    description: 'Carro de competição projetado para a F1 in Schools nos anos de 2023 e 2024 pela equipe Lobo Canindé.',
    tags: ['F1 in Schools', 'Lobo Canindé', 'Design 3D', 'Engenharia'],
    repo: null
  }
];

const technologies = [
  'JavaScript', 'React', 'Python', 'C#', 'AutoCAD', 'Revit', 'Fusion 360', 'Maya', 'Tailwind', 'Git'
].map(tech => ({ node: <span className="font-bold text-xl">{tech}</span> }));

const Home = () => {
  return (
    <div className="space-y-24 pb-12">
      {/* Seção Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-[70vh] gap-12 mt-8 md:mt-0">
        
        {/* Textos e CTA */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="text-5xl md:text-7xl font-extrabold tracking-tight flex flex-col md:block">
            <BlurText text="Olá, eu sou" className="inline-block mr-4" delay={0.05} />
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-salmon to-red-400 mt-2 inline-block"
            >
              Guilherme Martins
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="max-w-2xl space-y-4"
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Sou um desenvolvedor e projetista focado em construir soluções tecnológicas completas.
              Tenho forte atuação no ecossistema de software (JavaScript, Python, C#) e profunda 
              experiência em engenharia e modelagem 3D.
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400">
              Transformo ideias em realidade, seja através de linhas de código em interfaces premium ou 
              através de projetos precisos no AutoCAD, Revit, Fusion 360 e Maya.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start mt-8"
          >
            <Link to="/projects">
              <AnimatedButton primary>Veja meus projetos</AnimatedButton>
            </Link>
            <a href="https://github.com/Guimcv1" target="_blank" rel="noopener noreferrer">
              <AnimatedButton>Meu GitHub</AnimatedButton>
            </a>
          </motion.div>
        </div>

        {/* Imagem de Perfil Quadrada */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 group">
            {/* Square Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-salmon via-purple-600 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Square Photo Frame */}
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-2xl bg-gray-900 transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/minha-foto.jpeg" 
                alt="Guilherme Martins" 
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/f9fafb/fa8072?text=Sua+Foto+Aqui';
                }}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee de Tecnologias */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <LogoLoop 
          logos={technologies} 
          speed={50} 
          gap={32}
          className="text-gray-400 hover:text-salmon transition-colors"
        />
      </motion.div>

      {/* Destaque 3D Modelagem (Nova Seção de Visualizador 3D) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-salmon/10 border border-salmon/20 text-salmon rounded-full text-xs font-semibold">
              <Box className="w-3.5 h-3.5" />
              <span>Engenharia & Modelagem 3D</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Visualização <span className="text-salmon">3D Interativa</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Explore meus modelos tridimensionais diretamente no seu navegador! Você pode rotacionar, aproximar e alternar para o modo estrutura wireframe em tempo real.
            </p>
            <div className="pt-2">
              <Link 
                to="/projects" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-salmon text-white font-semibold hover:brightness-110 transition-all shadow-lg shadow-salmon/20"
              >
                Ver todos os projetos 3D
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <ThreeViewer 
              stlUrl="/3dModels/CarroCompleto+F3D.stl"
              title="Carro F1 in Schools - Lobo Canindé (2023/2024)"
              color="#3b82f6"
              height="320px"
            />
          </div>
        </div>
      </motion.section>

      {/* Visão Geral dos Projetos (Destaques) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Projetos em <span className="text-salmon">Destaque</span></h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Um pouco do que venho construindo recentemente.</p>
          </div>
          <Link to="/projects" className="text-salmon hover:text-gray-900 dark:hover:text-white transition-colors mt-4 md:mt-0 font-medium">
            Ver alguns projetos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, i) => (
             <div key={i} className="group flex flex-col sm:flex-row bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-salmon transition-colors hover:shadow-lg hover:shadow-salmon/10">
               <div className="w-full sm:w-2/5 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-4">
                 <img 
                   src={`/projeto-${i+1}.png`} 
                   alt={project.title}
                   className="w-full h-40 sm:h-full object-cover rounded-xl"
                   onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200/f9fafb/fa8072?text=Imagem+do+Projeto'; }}
                 />
               </div>
               <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                 <div>
                   <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-salmon transition-colors">{project.title}</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{project.description}</p>
                 </div>
                 <div className="flex justify-between items-center mt-4">
                   <div className="flex gap-2 flex-wrap">
                     {project.tags.map(tag => (
                       <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-600 dark:text-gray-300">{tag}</span>
                     ))}
                   </div>
                   {project.repo && (
                     <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                       <FaGithub className="w-5 h-5" />
                     </a>
                   )}
                 </div>
               </div>
             </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
