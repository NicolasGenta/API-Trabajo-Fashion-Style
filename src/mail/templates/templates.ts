export function createEstadoMail(name: string, emprendimiento :string, estado: string) {
    const message = `
        <body style="margin: 0; height: max-content; font-family: Arial, Helvetica, sans-serif;">
            <header style="height: 5em; background-color: #576872; display: flex; align-items: center; padding: 1em;">
                <img style="height: 80% ;" src="http://localhost:3000/image?filename=logo-left.svg"/>
            </header>
            <main style="width: 100%; display: flex; justify-content: center;">
                <div style="width: 80%; display: flex; justify-content: center; flex-wrap: wrap; ">
                    <div>
                    <p style="width: 100%;">Estimado/a ${name}</p>
                    <p style="width: 100%;">Le informamos que su emprendimiento <span style="font-weight: bold;">${emprendimiento.toUpperCase()}</span> ha sido puesto en estado <span style="font-weight: bold;"> ${estado.toUpperCase()}</span>. Como resultado, sus productos ya no estarán visibles en la web.</p>
                    <p style="width: 100%;">Para obtener más información, por favor, póngase en contacto con el Administrador.</p>
                    <p style="width: 100%;">Atentamente,</p>
                    <div style="width: 100%; display: flex; justify-content: start; font-weight: bold; font-size: small;">
                        <p>Equipo de EMPRENDE</p>
                    </div>
                    </div>
                </div>
            </main>
            <footer Style="height: max-content; color: white; background-color: #576872; display: flex; justify-content: center !important; align-items: 'center'; padding: 0.2em;">
                <div>
                    <p> 
                    © <a href='http://localhost:5173/' style="height: min-content; color: white; text-decoration: none">EMPRENDE</a>
                    </p>
                </div>    
            </footer>
        </body> 
    `
    return message
}