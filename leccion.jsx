import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';

const Leccion = () => {
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const [currentCard, setCurrentCard] = useState(-1);
  const [hasShownCard1, setHasShownCard1] = useState(false);
  const [hasShownCard2Explanation, setHasShownCard2Explanation] = useState(false);
  const [hasShownCard3Examples, setHasShownCard3Examples] = useState(false);
  const [hasShownCard4Causes, setHasShownCard4Causes] = useState(false);
  const [hasShownCard5Sections, setHasShownCard5Sections] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const totalCards = 11;

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    // Check if user is logged in
    const savedUsername = localStorage.getItem('username');
    if (!savedUsername) {
      window.location.href = '/login';
    } else {
      setUsername(savedUsername);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const nextCard = () => {
    if (currentCard >= totalCards - 1) {
      // Handle completion overlay
      return;
    }
    setCurrentCard(prev => prev + 1);
  };

  const prevCard = () => {
    if (currentCard <= -1) return;
    setCurrentCard(prev => prev - 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const progress = Math.round((currentCard / (totalCards - 1)) * 100);
  const remainingMinutes = Math.max(0, Math.ceil(15 * (1 - (currentCard / (totalCards - 1)))));

  return (
    <>
      <Head>
        <title>Módulo 1: ¿Qué es el cambio climático?</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>

      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js" strategy="beforeInteractive" />

      <nav className="bg-white shadow-sm fixed w-full z-[60]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-12">
            <div className="flex items-center space-x-4">
              <button onClick={toggleSidebar} className="md:hidden text-gray-600">
                <i className="ri-menu-line text-xl"></i>
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <i className="ri-arrow-left-line text-gray-600"></i>
                <span className="text-gray-600 hidden md:inline">Volver</span>
              </Link>
            </div>
            <div className="flex items-center">
              <img src="/cydsa-logo-black.svg" alt="CYDSA Logo" className="h-8 w-auto object-contain logo-black" />
              <img src="/cydsa-logo-white.svg" alt="CYDSA Logo" className="h-8 w-auto object-contain logo-white" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300">
                  <i className={theme === 'light' ? 'ri-sun-line text-xl' : 'ri-moon-line text-xl'}></i>
                </button>
                <img className="h-6 w-6 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=3176FF&color=fff`} alt={username} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">{username}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white shadow-sm fixed w-full top-12 z-[50]">
        <div className="max-w-7xl mx-auto px-4 py-1 md:py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <h1 className="text-sm md:text-lg font-bold text-black dark:text-gray-100">Módulo 1: ¿Qué es el cambio climático?</h1>
              </div>
              <div className="mt-0.5 md:mt-1">
                <progress className="progress-bar w-full h-1 md:h-1.5" value={progress} max="100"></progress>
                <div className="flex justify-between mt-0.5 md:mt-1 text-xs text-gray-500">
                  <span>{progress}% completado</span>
                  <span>{remainingMinutes} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className={`w-64 bg-white shadow-sm overflow-y-auto fixed h-[calc(100vh-8.5rem)] top-[8.5rem] transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-[40]`}>
          <div className="p-3">
            <div className="space-y-2">
              <div className="border-b pb-1">
                <h3 className="font-medium text-sm text-gray-900">Contenido del Curso</h3>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-primary bg-blue-50 p-1.5 rounded text-sm">
                  <i className="ri-play-circle-fill mr-2"></i>
                  <span>1. ¿Qué es el cambio climático?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">2. ¿Por qué está cambiando el clima?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">3. ¿Qué pasa si no hacemos nada?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">4. ¿Qué están haciendo los gobiernos?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">5. ¿Cómo se mide la contaminación?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">6. ¿Cómo podemos contaminar menos?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">7. ¿Cómo podemos adaptarnos?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">8. ¿Qué es el mercado de carbono?</span>
                </div>
                <div className="flex items-center text-gray-500 p-2 rounded">
                  <i className="ri-lock-line mr-2"></i>
                  <span className="text-sm">9. ¿Qué está haciendo CYDSA?</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="mainContent" className="flex-1 md:ml-64 transition-all duration-300 pt-[8.5rem]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 bg-gray-50">
            <div className="card-container">
              {/* Intro Card */}
              <div className={`bg-white rounded-lg shadow-sm page ${currentCard === -1 ? 'active' : 'hidden'}`}>
                <div className="card-content">
                  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-blue-100 text-primary rounded-full mb-4 md:mb-6">
                      <i className="ri-earth-line text-2xl md:text-4xl"></i>
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">Bienvenido al Módulo 1</h2>
                    <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-8">Exploraremos juntos el fascinante tema del cambio climático</p>
                    <div className="flex items-center space-x-2 text-sm md:text-base text-gray-500">
                      <i className="ri-time-line"></i>
                      <span>Duración: 15 minutos</span>
                    </div>
                    <button onClick={nextCard} className="mt-4 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-primary text-white text-sm md:text-base font-medium rounded-lg hover:bg-blue-600 transition-colors">
                      Comenzar
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 1: Introduction */}
              <div className={`bg-white rounded-lg shadow-sm page ${currentCard === 0 ? 'active' : 'hidden'}`}>
                <div className="card-content">
                  <div className="card-header !py-1 md:!py-3">
                    <div className="card-header-content">
                      <div className="card-icon bg-blue-100 text-primary w-6 h-6 md:w-10 md:h-10">
                        <i className="ri-book-open-line text-base md:text-xl"></i>
                      </div>
                      <h2 className="card-title text-base md:text-lg">¿Qué es el cambio climático?</h2>
                    </div>
                  </div>
                  <div className="card-body !p-1.5 md:!p-4">
                    <div className="prose max-w-none space-y-3 md:space-y-6">
                      <div className="bg-primary/5 p-4 md:p-8 rounded-xl">
                        <p className="text-base md:text-xl font-medium text-gray-800 leading-relaxed">
                          <span className="block mb-2 md:mb-4 text-primary">Cuando eras niño, ¿te acuerdas que llovía más seguido y hacía más fresco en ciertas épocas?</span>
                          Hoy en día el clima parece loco: llueve todo de golpe, hace calor en meses fríos, y hay incendios o sequías en lugares que antes no los tenían.
                        </p>
                      </div>
                      <div id="definitionBox" className={`bg-orange-100 p-4 md:p-8 rounded-xl transition-all duration-500 ${hasShownCard1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center justify-center">
                          <i className="ri-alert-line text-2xl md:text-4xl text-orange-600 mr-2 md:mr-4"></i>
                          <p className="text-xl md:text-3xl font-bold text-orange-600">
                            Eso se llama cambio climático.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Definition */}
              <div className={`bg-white rounded-lg shadow-sm page ${currentCard === 1 ? 'active' : 'hidden'}`}>
                <div className="card-content">
                  <div className="card-header !py-1 md:!py-3">
                    <div className="card-header-content">
                      <div className="card-icon bg-blue-100 text-primary w-6 h-6 md:w-10 md:h-10">
                        <i className="ri-book-open-line text-base md:text-xl"></i>
                      </div>
                      <h2 className="card-title text-base md:text-lg">Definición</h2>
                    </div>
                  </div>
                  <div className="card-body !p-1.5 md:!p-4">
                    <div className="prose max-w-3xl mx-auto w-full space-y-3 md:space-y-8">
                      <div className="bg-blue-50 p-4 md:p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-6">El cambio climático es:</h3>
                        <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
                          Cuando el clima de todo el planeta cambia y se queda así.
                        </p>
                      </div>

                      <div id="explanationBox" className={`explanation-box bg-gray-50 p-3 md:p-6 rounded-xl ${hasShownCard2Explanation ? 'show' : ''}`}>
                        <div className="flex items-start space-x-2 md:space-x-4">
                          <i className="ri-information-line text-xl md:text-2xl text-gray-500 mt-1"></i>
                          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            No es como cuando hace frío unos días y luego regresa a lo normal. Es un cambio que se queda y afecta a todo el mundo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Examples */}
              <div className={`bg-white rounded-lg shadow-sm page ${currentCard === 2 ? 'active' : 'hidden'}`}>
                <div className="card-content">
                  <div className="card-header !py-1 md:!py-3">
                    <div className="card-header-content">
                      <div className="card-icon bg-yellow-100 text-yellow-600 w-6 h-6 md:w-10 md:h-10">
                        <i className="ri-lightbulb-line text-base md:text-xl"></i>
                      </div>
                      <h2 className="card-title text-base md:text-lg">Ejemplos comunes</h2>
                    </div>
                  </div>
                  <div className="card-body !p-1.5 md:!p-4">
                    <div className="prose max-w-3xl mx-auto w-full space-y-3 md:space-y-8">
                      <div className="bg-yellow-50 p-4 md:p-8 rounded-xl shadow-sm">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-6">¿Cómo notamos el cambio climático?</h3>
                        <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-3 md:mb-8">
                          Estos son algunos ejemplos que podemos ver en nuestra vida diaria:
                        </p>
                        <div id="examplesGrid" className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm ${hasShownCard3Examples ? 'show' : ''}`}>
                            <div className="flex items-center mb-2 md:mb-4">
                              <i className="ri-drop-line text-xl md:text-3xl text-blue-500 mr-2 md:mr-3"></i>
                              <h4 className="text-base md:text-lg font-semibold text-gray-800">Lluvias</h4>
                            </div>
                            <p className="text-sm md:text-base text-gray-700">"Antes llovía seguido en junio; ahora no llueve o cae todo de golpe."</p>
                          </div>
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm ${hasShownCard3Examples ? 'show' : ''}`}>
                            <div className="flex items-center mb-2 md:mb-4">
                              <i className="ri-sun-line text-xl md:text-3xl text-yellow-500 mr-2 md:mr-3"></i>
                              <h4 className="text-base md:text-lg font-semibold text-gray-800">Temperatura</h4>
                            </div>
                            <p className="text-sm md:text-base text-gray-700">"Antes hacía fresco en diciembre; ahora sudamos en Navidad."</p>
                          </div>
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm ${hasShownCard3Examples ? 'show' : ''}`}>
                            <div className="flex items-center mb-2 md:mb-4">
                              <i className="ri-windy-line text-xl md:text-3xl text-gray-500 mr-2 md:mr-3"></i>
                              <h4 className="text-base md:text-lg font-semibold text-gray-800">Huracanes</h4>
                            </div>
                            <p className="text-sm md:text-base text-gray-700">"Las temporadas de huracanes son más intensas que hace 20 años."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Causes */}
              <div className={`bg-white rounded-lg shadow-sm page ${currentCard === 3 ? 'active' : 'hidden'}`}>
                <div className="card-content">
                  <div className="card-header !py-1 md:!py-3">
                    <div className="card-header-content">
                      <div className="card-icon bg-red-100 text-red-600 w-6 h-6 md:w-10 md:h-10">
                        <i className="ri-question-line text-base md:text-xl"></i>
                      </div>
                      <h2 className="card-title text-base md:text-lg">¿Por qué está ocurriendo?</h2>
                    </div>
                  </div>
                  <div className="card-body !p-1.5 md:!p-4">
                    <div className="prose max-w-3xl mx-auto w-full space-y-3 md:space-y-8">
                      <div className="bg-red-50 p-4 md:p-8 rounded-xl shadow-sm">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-6">Las principales causas son:</h3>
                        <div id="causesGrid" className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm text-center ${hasShownCard4Causes ? 'show' : ''}`}>
                            <i className="ri-factory-line text-2xl md:text-4xl text-red-500 mb-2 md:mb-4"></i>
                            <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">Industria</h4>
                            <p className="text-xs md:text-base text-gray-700">El humo de fábricas e industrias</p>
                          </div>
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm text-center ${hasShownCard4Causes ? 'show' : ''}`}>
                            <i className="ri-car-line text-2xl md:text-4xl text-red-500 mb-2 md:mb-4"></i>
                            <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">Transporte</h4>
                            <p className="text-xs md:text-base text-gray-700">Los gases de escape de vehículos</p>
                          </div>
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm text-center ${hasShownCard4Causes ? 'show' : ''}`}>
                            <i className="ri-fire-line text-2xl md:text-4xl text-red-500 mb-2 md:mb-4"></i>
                            <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">Combustibles</h4>
                            <p className="text-xs md:text-base text-gray-700">La quema de combustibles fósiles</p>
                          </div>
                          <div className={`example-card bg-white p-3 md:p-6 rounded-xl shadow-sm text-center ${hasShownCard4Causes ? 'show' : ''}`}>
                            <i className="ri-tree-line text-2xl md:text-4xl text-red-500 mb-2 md:mb-4"></i>
                            <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">Deforestación</h4>
                            <p className="text-xs md:text-base text-gray-700">La tala masiva de árboles</p>
                          </div>
                        </div>
                      </div>

                      <div id="effectBox" className={`example-card bg-gray-50 p-3 md:p-6 rounded-xl ${hasShownCard4Causes ? 'show' : ''}`}>
                        <div className="flex items-start space-x-2 md:space-x-4">
                          <i className="ri-error-warning-line text-xl md:text-2xl text-red-500 mt-1"></i>
                          <div>
                            <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">El efecto invernadero</h4>
                            <p className="text-sm md:text-base text-gray-700">Todos estos factores contribuyen a atrapar el calor en la atmósfera, como si fuera un invernadero gigante, calentando gradualmente nuestro planeta.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-[50] md:left-64" style={{ height: '4rem' }}>
        <div className="max-w-2xl mx-auto flex justify-between">
          <button onClick={prevCard} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg whitespace-nowrap flex items-center text-sm">
            <div className="w-4 h-4 flex items-center justify-center mr-1">
              <i className="ri-arrow-left-line"></i>
            </div>
            Anterior
          </button>
          <button onClick={nextCard} className="px-4 py-2 bg-primary text-white font-medium rounded-lg whitespace-nowrap flex items-center text-sm">
            Siguiente
            <div className="w-4 h-4 flex items-center justify-center ml-1">
              <i className="ri-arrow-right-line"></i>
            </div>
          </button>
        </div>
      </div>

      <style jsx global>{`
        :root {
          color-scheme: light dark;
          --header-height: 3rem;
          --progress-height: 2.5rem;
          --nav-bottom-height: 4rem;
          --top-offset: 8.5rem;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background-color: #f8fafc;
          transition: background-color 0.3s ease;
        }

        body.dark {
          background-color: #111827;
          color: #e5e7eb;
        }

        .progress-bar::-webkit-progress-bar {
          background-color: #e5e7eb;
          border-radius: 9999px;
        }

        .progress-bar::-webkit-progress-value {
          background-color: #3b82f6;
          border-radius: 9999px;
        }

        .dark .bg-white {
          background-color: #1f2937;
        }

        .dark .text-gray-800 {
          color: #f3f4f6;
        }

        .dark .text-gray-600 {
          color: #d1d5db;
        }

        .dark .text-gray-700 {
          color: #e5e7eb;
        }

        .dark .text-gray-500 {
          color: #9ca3af;
        }

        .dark .border-gray-200 {
          border-color: rgba(17, 24, 39, 0.7);
        }

        .dark .bg-gray-50 {
          background-color: #111827;
        }

        .dark .bg-blue-50 {
          background-color: #1e3a8a;
        }

        .dark .text-primary {
          color: #60a5fa;
        }

        .dark .bg-primary {
          background-color: #1d4ed8;
        }

        .logo-black {
          display: block;
        }

        .dark .logo-black {
          display: none;
        }

        .logo-white {
          display: none;
        }

        .dark .logo-white {
          display: block;
        }
      `}</style>
    </>
  );
};

export default Leccion;