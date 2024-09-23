/**
 * Este método lo que hace es recibir una dirección IP en el formato  exigido por el docente 
 * y lo convierte en un número binario sin los puntos
 * @param {*} ip "Recibe la IP del cliente en formato decimal y con los puntos" 
 * @returns  la direccion ip en binario
 */
function convertirDecBin(ip) {
    let octetos = ip.split('.');
    let binario = '';
    for (let i = 0; i < octetos.length; i++) {
        let octeto = parseInt(octetos[i]);
        // Convertir el octeto a binario de 8 bits
        binario += convertirOctetoBinario(octeto);
    }
    return binario; 
}

/**
 * El método se encarga de convertir cada cuarteto de la dirección Ip recibida y lo convierte en un octeto binario, que
 * luego será concatenado
 * @param {*} octeto Recibe el arreglo con los octetos
 * @returns Cada octeto en binario
 */
function convertirOctetoBinario(octeto) {
    return octeto.toString(2).padStart(8, '0'); 
}


/**
 * Recibe el número de máscara en decimal y lo vuelve un 
 * @param {*} mascara El usuario ingresa el número de la máscar
 * @returns Retorna el arreglo de longitud de 32, en el cual se halla la cantidad de unos y ceros
 */
function convetirMascara(mascara){
    let maskList = new Array(32).fill('0'); // Inicializa un arreglo de 32 ceros como strings
    for (let i = 0; i < mascara; i++) {
        maskList[i] = '1'; // Establece los primeros "mascara" elementos a "1"
    }
    return maskList; // Retorna la máscara en formato de arreglo de strings
}
/**
 * Permite la entrada de los dos parámetros necesarios para calcular la IP
 * para luego hallar la red resultante en binario
 * @param {*} ip dirección IP en el formato requerido
 * @param {*} mascara número de máscara
 * @returns El arreglo de longitud de 32 con los ceros y unos trabajados
 */
function calculoRed(ip, mascara) {
    // Convertimos IP y máscara a binario
    let ipBin = convertirDecBin(ip);
    let mascaraBin = convetirMascara(mascara);

    let resultadoBinario = new Array(32);
    resultadoBinario.fill('0')

    // Realizamos la operación AND bit a bit
    for (let i = 0; i < mascaraBin.length; i++) {
        if(ipBin[i]==1 && mascaraBin[i]==1 ){
            resultadoBinario[i]='1'
        }
    }
    return resultadoBinario
}

//Se debe hacer el resultado de lo que está acá en decimal
function convertirBinarioDecimal(binario) {
    let resultadoDecimal = [];
    for (let i = 0; i < 4; i++) {
        // Toma 8 bits a la vez para convertir a decimal
        let octetoBinario = binario.slice(i * 8, (i + 1) * 8).join('');
        resultadoDecimal.push(parseInt(octetoBinario, 2)); 
    }
    return resultadoDecimal.join('.'); 
}

/**
 * Calcula el número de hosts disponibles para la IP
 * @param {*} mask Recibe el numero de máscara del cliente
 * @returns El número de hosts disponibles
 */
function calcularCantidadHosts(mask){
    return Math.pow(2,32-mask)-2
}

/**
 * 
 * @param {*} ip Recibe la dirección ip en Binario y 
 * @param {*} mascara Recibe el número de la máscara asignada por el cliente
 * @returns la dirección de broadcast destinada para la IP 
 */
function hallarBroadcast(ip, mascara){
    // Los bits de host (después de la máscara) se llenan con 1
    for (let i = mascara; i < 32; i++) {
        ip[i] = '1';
    }
    return ip;
}

/**
 * Este método debe recibir la dirección de red en binario, y está destinado para 
 * hallar la ip del primer host útil
 * @param {*} ip recibe la dirección de red 
 * @returns devuelve la ip del primer host útil
 */
function hallarHostMinimo(ip){
    let dir = convertirBinarioDecimal(ip).split('.').map(Number);
    // Se incrementa el último octeto de la dir. de red
    dir[3] += 1; 
    return dir.join('.');
}

/**
 * Este método debe recibir la dirección de broadcast en binario, y está destinado para 
 * hallar la ip del último host útil
 * @param {*} ip recibe la dirección de Broadcast 
 * @returns devuelve la ip del último host útil
 */
function hallarHostMaximo(ip){
    let dir = convertirBinarioDecimal(ip).split('.').map(Number);
    // Se decrementa el último octeto de la dir. de Broadcast
    dir[3] -= 1; 
    return dir.join('.');
}
/**
 * 
 * @param {*} IpDecimal Recibe la ip calculada y 
 * @returns Retorna la clasificación en Clase A, B, C y también dice si es Homologada o no 
 */
function clasificarIp(ipDecimal){
    // Convertimos el primer octeto a número
    let aux = parseInt(ipDecimal.split('.')[0]);
    let clase
    
    switch (true) {
        case (aux >= 0 && aux <= 127):
            clase = "Clase A";
            break

        case (aux >= 128 && aux <= 191):
            clase = "Clase B";
            break

        case (aux >= 192 && aux <= 223):
            clase = "Clase C";
            break

        default:
            clase = "Fuera de Rango";
            return clase;
    }

    if (clasificarSituacion(ipDecimal)) {
        clase += " No Homologada (Privada o Reservada)";
    } else {
        clase += " Homologada (Real o Pública)";
    }
    return clase

}

// Aquí lo que hace es decir si es publica o privada
function clasificarSituacion(ipDecimal){
    let octetos = ipDecimal.split('.').map(Number)

    switch (true) {
        // Clase A privada: 10.0.0.0 - 10.255.255.255
        case (octetos[0] === 10):
            return true;
        // Clase B privada: 172.16.0.0 - 172.31.255.255
        case (octetos[0] === 172 && octetos[1] >= 16 && octetos[1] <= 31):
            return true;
        // Clase C privada: 192.168.0.0 - 192.168.255.255
        case (octetos[0] === 192 && octetos[1] === 168):
            return true;
        default:
            return false;
    }

}
//Realiza la marcación de la porción de red y la de host con la dirección ip generada en binario y la máscara en decimal 
function colorearBinario(ipBin, mascara) {
    console.log(ipBin)
    let red = ipBin.slice(0, mascara).join('');   
    let host = ipBin.slice(mascara).join('');     
    return `
        <span style="background-color: red;">${red}</span><span style="background-color: green;">${host}</span>
    `;
}
function validarIP(ip) {
    // Expresión regular para validar que solo haya números y puntos (valores entre 0 y 255)
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]?)$/;
    return regex.test(ip);
}


function mostrarResultados() {
    const ip = document.getElementById('ip').value.trim(); 
    const mascara = parseInt(document.getElementById('mascara').value);

    if (!ip) {
        alert("El campo de Dirección IP no puede estar vacío.");
        return;
    }

    if (!mascara) {
        alert("El campo de Número de Máscara no puede estar vacío.");
        return;
    }

    // Validar que el IP tenga solo números y puntos
    if (!validarIP(ip)) {
        alert("La dirección IP ingresada no es válida. ");
        return;
    }

    // Validar que el IP no tenga más de 15 caracteres
    if (ip.length > 15) {
        alert("La dirección IP no puede tener más de 15 caracteres.");
        return;
    }


    const ipResultadoBin = calculoRed(ip, mascara)
    const ipResultadoBin1 = calculoRed(ip, mascara)
    const ipResultadoDec = convertirBinarioDecimal(ipResultadoBin)
    const cantidadHosts = calcularCantidadHosts(mascara);
    const broadcastBin = hallarBroadcast(ipResultadoBin, mascara);
    const broadCastDec = convertirBinarioDecimal(broadcastBin)
    const hostMinimo = hallarHostMinimo(ipResultadoBin1);
    const hostMaximo = hallarHostMaximo(broadcastBin);
    const clasificacion = clasificarIp(ipResultadoDec);
    const ipColoreada = colorearBinario(ipResultadoBin1, mascara);


    document.getElementById('resultado').innerHTML = `
        <b>Dirección Ip:</b> ${ipResultadoDec}<br>
        <b>Cantidad de Hosts:</b> ${cantidadHosts}<br>
        <b>Dirección de Broadcast:</b> ${broadCastDec}<br>
        <b>Primer Host Útil:</b> ${hostMinimo}<br>
        <b>Último Host Útil:</b> ${hostMaximo}<br>
        <b>Clasificación de IP:</b> ${clasificacion}
        <b>Binario:</b> ${ipColoreada}<br>
        <b>Rojo => Porción de Red</b><br>
        <b>Verde => Porción de Host</b><br>

    `;
}
