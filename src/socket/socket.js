module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`);
    // console.log(socket);

    socket.on("disconnect", (reason) => {
      console.log(`socket ${socket.id} disconnected due to ${reason}`);

      // todo se puede ver los rooms que estaba conectado
      console.log("socket.rooms.size :>> ", socket.rooms.size);
      console.log("socket.rooms.size == 0:>> ", socket.rooms.size == 0);
      console.log("socket.rooms :>> ", socket.rooms);
    });

    socket.on("disconnecting", (reason) => {
      console.log(`socket ${socket.id} disconnecting due to ${reason}`);
      console.log(socket.rooms); // Set { ... }
    });

    //   const safeJoin = (currentId) => {
    //     socket.leave(previousId);
    //     socket.join(currentId, () =>
    //       console.log(`Socket ${socket.id} joined room ${currentId}`)
    //     );
    //     previousId = currentId;
    //   };

    console.log(socket.rooms); // Set { <socket.id> }
    // io.in(socket.id).socketsJoin("room1");

    // socket.join("room1");

    // return all Socket instances in the "room1" room of the main namespace
    // const sockets = await io.in("room1").fetchSockets();

    // disconnect all clients in the "room-101" room
    // io.in("room-101").disconnectSockets();

    socket.on("joinRoom", (id) => {
      console.log("se conectaaaa");
      console.log("id :>> ", id);
      socket.join(`puja-${id}`);
      console.log(socket.rooms);
    });

    socket.on("abandonar", (id) => {
      console.log("id :>> ", id);
      socket.leave(`puja-${id}`);

      console.log(socket.rooms);
    });

    socket.on("finalizar", (id) => {
      console.log("id :>> ", id);
      // make all Socket instances in the "room1" room disconnect (and discard the low-level connection)
      io.in(`${id}`).disconnectSockets(true);
      console.log(socket.rooms);
    });

    // todo ver esto
    // make all Socket instances leave the "room1" room
    // io.socketsLeave("room1");

    // todo esto sirve para desconectar a todos de la subasta al finalizar
    // make all Socket instances in the "room1" room disconnect (and close the low-level connection)
    // io.in("room1").disconnectSockets(true);

    // todo este evento lo usaremos para enviar a todos excepto al que lo envio
    // to all clients in "room4" except the ones in "room5" and the sender
    // socket.to("room4").except("room5").emit(/* ... */);

    //   io.to("room 237").emit(`user ${socket.id} has left the room`);

    // io.on("connection", (socket) => {

    //   // to one room
    // socket.to("1").emit("an event", { some: "data" });

    //   // to multiple rooms
    //   socket.to("room1").to("room2").emit("hello");

    //   // or with an array
    //   socket.to(["room1", "room2"]).emit("hello");

    //   // a private message to another socket
    //   socket.to(/* another socket id */).emit("hey");

    //   // WARNING: `socket.to(socket.id).emit()` will NOT work
    //   // Please use `io.to(socket.id).emit()` instead.
    // });

    // this also works with a single socket ID
    // io.of("/admin").in(theSocketId).disconnectSockets();

    // socket.on("disconnect", (reason) => {
    // ...
    // });

    // if (socket.recovered) {
    //   console.log("socket.recovered :>> ", socket.recovered);
    //   // recovery was successful: socket.id, socket.rooms and socket.data were restored
    // } else {
    //   console.log(
    //     "socket.recoveredsocket.recovered :>> ",
    //     socket.recoveredsocket.recovered
    //   );
    // new or unrecoverable session
    // }

    socket.on("subasta", ({ id: room, monto }) => {
      console.log("ghghghghghghgghghghgh");
      console.log("ghghghghghghgghghgh");
      console.log("ghghghghghghgghghghh");
      console.log("ghghghghghghghghgh");
      console.log("ghghghghghghgghghghgh");
      console.log("llego hasta acaaaa");
      console.log("=====================================================");
      console.log("====================================================");
      console.log("room :>> ", room);
      console.log("===================================================p=");

      console.log("socket.rooms :>> ", socket.rooms);

      // console.log("id :>> ", id);
      // console.log("monto :>> ", monto);
      // socket.to(` ${id} `).emit("an event", { some: "data" });
      // io.to(` ${id} `).emit(
      //   `cuarto1`,
      //   // `user ${socket.id} has left the room`,
      //   "esta es la dataaaaaaaaaaaaaa en el room1"
      // );

      // io.to(``).emit("some event");

      // todo este hace que se emita un evento excepto a quien lo hizo
      // socket.to(`${room}`).emit(`puja-${room}`, { monto: monto });
      // todo este evento hace que a todos incluido el sender reciba actualizacion
      io.to(`puja-${room}`).emit(`puja-${room}`, { monto: monto });
    });
    // the “foo” event will be broadcast to all connected clients in the “room-101” room
    // io.to("room1-101").emit("foo", "bar");

    // socket.emit("segundo", "este data viene del backend");

    // make all Socket instances join the "room1" room
    // io.socketsJoin("room1");

    // make all Socket instances in the "room1" room join the "room2" and "room3" rooms
    // io.in("room1").socketsJoin(["room2", "room3"]);

    // this also works with a single socket ID
    // console.log(socket.rooms); // Set { <socket.id> }
    // io.in(theSocketId).socketsJoin("room1");

    // socket.join("room1");

    // console.log(socket.rooms);

    // make all Socket instances in the "room1" room leave the "room2" and "room3" rooms
    // io.in("room1").socketsLeave(["room2", "room3"]);

    // this also works with a single socket ID
    // io.in(theSocketId).socketsLeave("room1");
    // });
  });
};
