import React from 'react';
function MainIndex(){
    return (
        <div>
            <div className='container-fluid'>
                <img src={require('./../../files/LasPichangas2.png')} alt="" className="img-responsive center-block d-block mx-auto" />
            </div>
            <div className="row justify-content-center">
                <div className="col col-md-8 text-center">
                    <h1>Complejo Deportivo Las Pichangas</h1>
                    <p>Les damos la bienvenida al complejo deportivo, donde tenemos las mejores canchas para que tu y tu equipo puedan tener una grata tarde jugando un buen partido de futbol.
                    </p>
                    <p>Disponemos a ti, un sistema de reservas que te permite generar una reserva en línea, eliminando la necesidad de llamarnos por teléfono para agendar, solo debes crear una cuenta, buscar una fecha para reservar, y efectuar una reserva o pagarla de inmediato.
                    </p>
                    <h3>¡Anímate a jugar con nosotros!
                    </h3>
                </div>
            </div>
        </div>
    );
}
export default MainIndex;