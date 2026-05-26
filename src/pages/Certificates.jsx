import { motion } from 'framer-motion';
import { Award, FileText, Download } from 'lucide-react';
import FadeContent from '../components/FadeContent';

const certificatesData = [
  { title: 'JavaScript Essentials 1', file: 'JavaScript_Essentials_1_certificado.pdf', image: 'jsinicial.png', type: 'Programming' },
  { title: 'Python Essentials 1', file: 'Python_Essentials_1.pdf', type: 'Programming' },
  { title: 'HTML Inicial', file: 'Html Inicial.pdf', image: 'html.png', type: 'Web' },
  { title: 'Análise de Dados', file: 'Analise de Dados.pdf', image: 'Fundamentos_Analise_Dados.png', type: 'Data' },
  { title: 'Introdução à Cibersegurança', file: 'Introdução à Cibersegurança.pdf', image: 'ciber.png', type: 'Security' },
  { title: 'Conceitos Básicos de Redes', file: 'Conceitos Básicos de Redes.pdf', type: 'Network' },
  { title: 'Robótica', file: 'Robotica.jpeg', type: 'Hardware' },
  { title: 'Fusion 360 - Prototipagem de Drones', file: 'Fusion 360 Prototipagem de Drones.pdf', image: 'drone.png', type: 'Design 3D' },
  { title: 'Fusion 360 - Carros Esportivos', file: 'Fusion 360 Carros Esportivos.pdf', image: 'carros_esportivos.png', type: 'Design 3D' },
  { title: 'Criatividade e Inovação', file: 'Despertando_a_Criatividade_e_a_Inovacão-Certificado_7994.pdf', image: 'Inovação.png', type: 'Soft Skills' },
  { title: 'Lideranças Impactantes', file: 'Desafios_Complexos_e_Liderancas_Impactantes.pdf', type: 'Soft Skills' },
  { title: 'Domínio do ESG', file: 'Elevacão_Sustentavel_Dominio_do_ESG_para_um_Futuro_Responsavel-Certificado_8007.pdf', type: 'Business' },
  { title: 'Certificado Hashtag', file: 'certificado Hashtag.pdf', type: 'Various' }
];

const Certificates = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Meus <span className="text-salmon">Certificados</span></h2>
        <p className="text-gray-500 dark:text-gray-400">Aqui estão algumas das minhas certificações e cursos concluídos ao longo da minha jornada.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {certificatesData.map((cert, i) => (
          <FadeContent key={i} delay={i * 0.1} y={30} className="h-full">
            <div className="group relative p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-salmon dark:hover:border-salmon transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:shadow-salmon/20 overflow-hidden">
              {cert.image && (
                <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-300">
                  <img src={`/certificates/${cert.image}`} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-salmon/10 transition-colors">
                  <Award className="w-6 h-6 text-salmon" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
                  {cert.type}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex-grow relative z-10">{cert.title}</h3>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center relative z-10">
                <a 
                  href={`/certificates/${cert.file}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-500 hover:text-salmon flex items-center transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Visualizar
                </a>
                <a 
                  href={`/certificates/${cert.file}`} 
                  download
                  className="text-gray-400 hover:text-salmon transition-colors"
                  title="Fazer Download"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </FadeContent>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
