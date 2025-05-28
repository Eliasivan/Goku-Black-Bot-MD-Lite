const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const readline = require('readline');
const chalk = require('chalk');

(async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Mostrar QR en terminal
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (texto) => new Promise((resolve) => rl.question(texto, resolve));

    const requestPairingCode = async () => {
        try {
            const addNumber = await question(chalk.bold.cyan('Ingrese su número de WhatsApp (+57321XXXXXXX): '));
            const pairingCode = await sock.requestPairingCode(addNumber.replace(/\D/g, ''));
            const formattedCode = pairingCode.match(/.{1,4}/g).join('-');
            console.log(chalk.bold.green(`Código de vinculación generado: ${ catch (error) {
            console.error(chalk.bold.red('Error al generar el código de vinculación:'), error.message);
        } finally {
            rl.close();
        }
    };

    const methodChoice = await question(
        chalk.bold.cyan('Seleccione el método de vinculación:\n') +
        chalk.bold.red('📷 Vincular con Código QR\n') +
        chalk.bold.red('✏️ Vincular con Código de Texto (8 Dígitos)\n--> ')
    );

    if (methodChoice.trim().toLowerCase().includes('qr')) {
        console.log(chalk.bold.green('Generando código QR, escanéalo desde tu dispositivo.'));
    } else if (methodChoice.trim().toLowerCase().includes('texto')) {
        await requestPairingCode();
    } else {
        console.log(chalk.bold.red('Opción inválida. Por favor, seleccione una opción válida.'));
        rl.close();
    }
})();