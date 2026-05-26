import { motion } from 'framer-motion';
import { FaCode, FaCube, FaTools, FaLaptopCode } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Design 3D & Engenharia',
    icon: <FaCube className="w-6 h-6" />,
    description: 'Modelagem paramétrica, arquitetura e prototipagem industrial.',
    skills: [
      { name: 'Autodesk Fusion 360', desc: 'Especialista em prototipagem mecânica, desenvolvimento de drones e superfícies complexas para impressão 3D.' },
      { name: 'AutoCAD & Revit', desc: 'Desenvolvimento de plantas precisas e modelagem BIM para projetos civis, arquitetônicos e estruturais.' },
      { name: 'Autodesk Maya', desc: 'Animação 3D, rigging avançado e modelagem orgânica detalhada para games e apresentações.' }
    ]
  },
  {
    title: 'Desenvolvimento Front-end',
    icon: <FaLaptopCode className="w-6 h-6" />,
    description: 'Criação de interfaces modernas, responsivas e interativas.',
    skills: [
      { name: 'JavaScript & React', desc: 'Construção de SPAs (Single Page Applications), gerenciamento de estado complexo e ecossistema React.' },
      { name: 'HTML, CSS & Tailwind', desc: 'Estruturação semântica e estilização ágil focada em design premium e animações fluidas.' }
    ]
  },
  {
    title: 'Desenvolvimento Back-end',
    icon: <FaCode className="w-6 h-6" />,
    description: 'Lógicas de negócios, automação e sistemas robustos.',
    skills: [
      { name: 'Python', desc: 'Scripts de automação inteligente, manipulação de grandes volumes de dados e back-ends escaláveis.' },
      { name: 'C#', desc: 'Criação de sistemas de gestão corporativos e aplicações desktop com regras de negócios complexas.' }
    ]
  },
  {
    title: 'Ferramentas & Metodologias',
    icon: <FaTools className="w-6 h-6" />,
    description: 'Ecossistema de trabalho e boas práticas de desenvolvimento.',
    skills: [
      { name: 'Git & GitHub', desc: 'Controle de versão rigoroso, fluxos de trabalho ágeis (GitFlow) e colaboração em equipes.' },
      { name: 'UI/UX Design', desc: 'Criação de wireframes, protótipos de alta fidelidade e foco total na experiência do usuário final.' }
    ]
  }
];

const Skills = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-6xl mx-auto pb-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Minhas <span className="text-salmon">Habilidades</span></h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Muito mais do que apenas código. Combino engenharia, design 3D e desenvolvimento de software para projetar soluções do zero à realidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {skillCategories.map((category, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 hover:border-salmon/40 dark:hover:border-salmon/40 hover:shadow-2xl hover:shadow-salmon/10 transition-all duration-500 group/card"
          >
            <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800 group-hover/card:border-salmon/20 transition-colors">
              <div className="p-4 bg-salmon/10 text-salmon rounded-2xl group-hover/card:bg-salmon group-hover/card:text-white transition-all duration-500">
                {category.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/card:text-salmon transition-colors">{category.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              {category.skills.map((skill, j) => (
                <div key={j} className="group/skill flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 group-hover/skill:bg-salmon transition-colors duration-300 group-hover/skill:scale-150" />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{skill.name}</h4>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm ml-5 pl-3 border-l-2 border-gray-100 dark:border-gray-800 group-hover/skill:border-salmon/40 transition-colors leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
