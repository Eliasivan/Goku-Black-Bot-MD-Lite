import chalk from 'chalk';

export default async function (m, conn = { user: {} }) {
    const sender = m.sender.replace('@s.whatsapp.net', '');
    const message = m.text || 'Sin mensaje';

    console.log(`${chalk.blue('Número:')} ${chalk.green(sender)}`);
    console.log(`${chalk.blue('Mensaje:')} ${chalk.green(message)}`);
}