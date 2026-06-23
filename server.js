const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let players = {}; 

io.on('connection', (socket) => {
    const currentPlayers = Object.values(players);
    
    if (!currentPlayers.includes('w')) {
        players[socket.id] = 'w';
        socket.emit('assign-role', 'w');
    } else if (!currentPlayers.includes('b')) {
        players[socket.id] = 'b';
        socket.emit('assign-role', 'b');
    } else {
        socket.emit('assign-role', 'spectator');
    }

    // --- REGLA DE GODOFREDO: ¿Están ambos listos? ---
    const updatedPlayers = Object.values(players);
    if (updatedPlayers.includes('w') && updatedPlayers.includes('b')) {
        io.emit('start-game'); // Avisa a TODOS que la batalla empieza
        console.log('¡Ambos caballeros están listos! Que comience el torneo.');
    }

    socket.on('make-move', (data) => {
        socket.broadcast.emit('move-received', data);
    });

    socket.on('disconnect', () => {
        const role = players[socket.id];
        delete players[socket.id];
        console.log(`Un caballero (${role}) ha abandonado el castillo.`);
        
        // Si uno se va, volvemos a poner el cartel de espera a los que queden
        io.emit('opponent-left');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`--- EL REINO ESTÁ ONLINE ---`);
});