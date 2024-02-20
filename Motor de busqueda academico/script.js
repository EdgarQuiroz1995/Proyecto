document.getElementById('btnBuscar').addEventListener('click', function() {
    // Obtener el texto de búsqueda
    const textoBuscar = document.getElementById('inputBuscar').value;
    
    // Realizar la petición HTTP
    fetch('http://localhost:3000/buscar?palabraClave=' + textoBuscar)
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta
        const respuesta=[];
        for (const enlaces of data.enlaces) {
            const respuestaHTML = `   
            <h1><strong>Título:</strong> <a Target="_blank" href="${enlaces.link}">${enlaces.titulo} </a></p>
            <p><strong>Autor:</strong> <a Target="_blank" href="${enlaces.autor_link}">${enlaces.autor}</a></p>
            <p><strong>Publicado:</strong> <a Target="_blank" href="${enlaces.publicado_link}">${enlaces.publicado}</a></p>
          `

            respuesta.push(respuestaHTML)
        } 

        document.getElementById('contenedorBusqueda').classList.add('oculto'); 
 
        // Mostrar contenedor de respuesta
        const contenedorRespuesta = document.getElementById('respuesta');
        contenedorRespuesta.innerHTML = respuesta;
        contenedorRespuesta.classList.remove('oculto');
        
      })
      .catch(error => {
        console.error('Error en la petición:', error);
      });
  });
  