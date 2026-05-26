import { Mail, Copy } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('guimcvilmarr@gmail.com');
    alert('E-mail copiado para a área de transferência!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold border-b border-gray-200 dark:border-gray-800 pb-4 text-center text-gray-900 dark:text-white">Entre em <span className="text-salmon">Contato</span></h2>
      
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <div className="flex-1 space-y-6">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Estou aberto a novas oportunidades e colaborações. Sinta-se à vontade para me mandar uma mensagem pelas redes sociais ou por e-mail.
          </p>
          
          <div className="flex gap-4">
            <a href="https://github.com/Guimcv1" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-salmon dark:hover:bg-salmon hover:text-white dark:hover:text-white transition-colors"><FaGithub className="w-5 h-5"/></a>
            <a href="https://www.linkedin.com/in/guilherme-martins-75542928a/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-salmon dark:hover:bg-salmon hover:text-white dark:hover:text-white transition-colors"><FaLinkedin className="w-5 h-5"/></a>
            <a href="https://www.instagram.com/guimcv_/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-salmon dark:hover:bg-salmon hover:text-white dark:hover:text-white transition-colors"><FaInstagram className="w-5 h-5"/></a>
          </div>

          <button 
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-salmon dark:hover:border-salmon hover:text-salmon dark:hover:text-salmon text-gray-700 dark:text-gray-300 transition-colors bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Mail className="w-5 h-5" />
            guimcvilmarr@gmail.com
            <Copy className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Envie uma mensagem</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Nome</label>
              <input type="text" className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-salmon focus:ring-1 focus:ring-salmon" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">E-mail</label>
              <input type="email" className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-salmon focus:ring-1 focus:ring-salmon" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Mensagem</label>
              <textarea rows={4} className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-salmon focus:ring-1 focus:ring-salmon" placeholder="Como posso ajudar?"></textarea>
            </div>
            <button className="w-full bg-salmon text-white font-bold py-3 rounded-lg hover:brightness-110 shadow-md transition-all">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
