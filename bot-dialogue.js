// ============================================================
//  BOT-DIALOGUE.JS — lo que dice (o suena) cada personaje
// ============================================================
// Diccionario: botId -> código de evento -> lista de frases. Cuando el
// motor de bots.js (ver detectCommentaryEvent, al final del archivo)
// detecta un evento, el que muestra el cartel en pantalla (todavía sin
// construir — eso viene después, cuando se defina el nuevo lugar en el
// layout) busca acá la lista correspondiente al bot y al evento, y
// elige UNA frase al azar entre las que haya, con la misma probabilidad
// para cada una — no importa si hay 1, 3 o 10 frases cargadas.
//
// Los dieciséis códigos de evento posibles (deben coincidir EXACTO con
// los que devuelve detectCommentaryEvent en bots.js):
//   VICTORIA, DERROTA, EMPATE,
//   CORONACION_SUFRIDA, CORONACION_PROPIA,
//   CAPTURA_MULTIPLE_SUFRIDA, CAPTURA_MULTIPLE_PROPIA,
//   TODO_DAMAS, POCAS_FICHAS_EN_DESVENTAJA,
//   DIFERENCIA_GRANDE_EN_CONTRA, DIFERENCIA_GRANDE_A_FAVOR,
//   PARIDAD_POCAS_FICHAS, PARTIDO_LARGO,
//   INICIO_HOSTILIDADES, COMENTARIO_ALEATORIO, INICIO_PARTIDA
//
// Completar de a poco, con total libertad: dejar como [] (arreglo
// vacío) cualquier evento que todavía no tenga frase — si la lista
// está vacía, o directamente no existe la entrada para ese bot, no se
// muestra nada (no revienta ni tira error, simplemente ese evento pasa
// en silencio para ese personaje esa vez).
//
// Cada frase va entre comillas, y las frases se separan con coma —
// las comas que uses DENTRO de una frase (";eso, che, no importa!")
// no rompen nada, porque quedan protegidas adentro de las comillas;
// lo que separa una frase de la siguiente es la coma que está POR
// FUERA de las comillas, en la lista.
//
// Por ahora está lleno de ejemplo solo el nivel 1 (Neanderthalius),
// para poder probar que el mecanismo dispara bien — son frases de
// prueba, las podés dejar, tocar, o tirar todas y arrancar de cero,
// como quieras. El resto de los niveles quedan con las listas vacías,
// bien marcadas, para que las vayas llenando cuando tengas ganas.
//
// ¡OJO CON LA LORA PRODIGIO! (nivel 7, id "loraprodigio") — su entrada,
// más abajo, no lleva frases de texto sino nombres de archivo de
// sonido (por ejemplo "lora-captura-1.mp3") que después se van a
// buscar en la carpeta de sonidos que definamos — está separada del
// resto y marcada aparte para que no se mezcle con las demás, que sí
// son texto.

const BOT_DIALOGUE = {

    // ---- Nivel 1: Neanderthalius (LLENO DE EJEMPLO, para probar) ----
    neanderthalius: {
        VICTORIA: [
            "¡UGH! ¡Neanderthalius ganó! Neanderthalius mejor de todos.",
            "Neanderthalius gana. Otro pierde. Así es vida."
        ],
        DERROTA: [
            "Uh... Neanderthalius perdió. Otro bueno con fichas.",
            "Neanderthalius triste. Pero Neanderthalius jugará de nuevo."
        ],
        EMPATE: [
            "Nadie gana, nadie pierde. Neanderthalius... confundido, pero bien.",
            "Empate está bien. Neanderthalius no enojado."
        ],
        CORONACION_SUFRIDA: [
            "Uh... eso no bueno para Neanderthalius.",
            "Ficha grande de otro. Neanderthalius no gusta."
        ],
        CORONACION_PROPIA: [
            "¡UGH! ¡Ficha de Neanderthalius ahora GRANDE!",
            "Neanderthalius tiene ficha poderosa. ¡Uh-uh!"
        ],
        CAPTURA_MULTIPLE_SUFRIDA: [
            "Auu... muchas fichas se fueron. Neanderthalius triste.",
            "Eso... eso dolió. Varias de una vez."
        ],
        CAPTURA_MULTIPLE_PROPIA: [
            "¡UNA, DOS, TRES! ¡Neanderthalius come mucho!",
            "¡Ugh-ugh-ugh! Neanderthalius fuerte hoy."
        ],
        TODO_DAMAS: [
            "Ya no hay fichas chiquitas. Solo grandes. Raro.",
            "Tablero lleno de fichas grandes ahora. Neanderthalius confundido."
        ],
        POCAS_FICHAS_EN_DESVENTAJA: [
            "Neanderthalius tiene poquitas. Neanderthalius nervioso.",
            "Esto... esto no va bien para Neanderthalius."
        ],
        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Otro tiene muchas más. Neanderthalius no entiende cómo.",
            "Uh-oh. Otro ganando mucho."
        ],
        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Neanderthalius tiene MUCHAS fichas! ¡Uh!",
            "Neanderthalius ganando mucho. Neanderthalius contento."
        ],
        PARIDAD_POCAS_FICHAS: [
            "Pocas fichas para los dos ahora. Neanderthalius atento.",
            "Casi terminando. Pocas fichas quedan."
        ],
        PARTIDO_LARGO: [
            "Esto lleva mucho tiempo. Neanderthalius cansado.",
            "Partido largo. Sol ya se movió mucho en el cielo."
        ],
        INICIO_HOSTILIDADES: [
            "¡Ahora sí! ¡Ya empezó pelea de fichas!",
            "Uh-uh, ya no hay más espera. Ahora en serio."
        ],
        COMENTARIO_ALEATORIO: [
            "Neanderthalius le gusta esta piedra plana con cuadraditos.",
            "¿Otro también piensa mucho para mover ficha?",
            "Neanderthalius tiene hambre. Pero primero, ficha."
        ],
        INICIO_PARTIDA: [
            "Neanderthalius listo. Neanderthalius siempre listo.",
            "¡Uh! Juego empieza. Neanderthalius contento."
        ]
    },

    // ---- Nivel 2: Monsieur Fisure Termidor ----

    termidor: {

        VICTORIA: [
            "¡Voilà! ¡La nobleza francesa vuelve a demostrar su superioridad! ¡Y el Termidor, por supuesto!",
            "¡Magnifique, mon ami! ¡Te he derrotado! Glup... sabía perfectamente lo que estaba haciendo.",
            "¡Victoria! ¡Sabía que esta partida estaba bajo mi control desde el principio! Bueno... casi desde el principio.",
            "¡Ha sido un honor aplastarte, mon ami! Ahora permíteme celebrar como corresponde: ¡Termidor para todos!"
        ],

        DERROTA: [
            "Ah... me has derrotado. Bueno, mon ami, mientras quede Termidor en la caja, hay cosas peores.",
            "¡Me estás cagando a palos! Pero no importa... el próximo Tetra Brik seguramente me devuelva mi talento.",
            "He perdido... ¡hic! Pero no es grave. Grave sería que se acabara el Termidor.",
            "Bueno, he sido derrotado. Mi honor ha sufrido un duro golpe... pero mi copa sigue llena, y eso es lo importante."
        ],

        EMPATE: [
            "¡Un empate! Ni vencedor ni vencido, mon ami. Una partida digna de dos grandes caballeros... glup.",
            "¡Hemos quedado iguales! Magnifique. Aunque debo admitir que el Termidor me tenía preparado para la victoria.",
            "Empate honorable, mon ami. La próxima vez beberé un poco más y entonces veremos quién manda aquí.",
            "¡Un empate! Brindo por ello. Bueno... en realidad brindo por cualquier cosa."
        ],

        CORONACION_SUFRIDA: [
            "¡Sacré bleu! ¡Ha conseguido una dama! Bueno, bueno... no pasa nada. Esto todavía se puede remontar.",
            "¡Mon Dieu! Esa ficha grande me ha complicado la existencia. Pero todavía tengo Termidor.",
            "¡Una dama! ¡Qué insolencia! Hic... Tendré que ponerme serio ahora. O tomar otra copa.",
            "Ah, has coronado. Muy bien, mon ami... disfrutá de tu pequeño triunfo mientras puedas."
        ],

        CORONACION_PROPIA: [
            "¡Voilà! ¡Una dama para Monsieur Termidor! ¡El vino me está haciendo jugar como un maestro!",
            "¡Magnifique! ¡Ficha grande! Sabía que el Termidor tenía un plan.",
            "¡He coronado, mon ami! ¡Esto es lo que ocurre cuando uno juega ligeramente entonado!",
            "¡Una dama! ¡Hic! ¡Ahora sí que se acabó la cortesía!",
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Oh là là! ¡Me has llevado varias fichas de una sola vez! Bueno... todavía queda vino.",
            "¡Mon Dieu, qué masacre! ¡Me has comido varias fichas! Esto no estaba en mis cálculos... aunque mis cálculos están un poquito borrosos.",
            "¡Eso ha sido una carnicería, mon ami! Pero tranquilo, que el Termidor todavía corre por mis venas.",
            "¡Hic! ¡Me has hecho puré unas cuantas fichas! Bueno, bueno... ya vendrá mi revancha."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡UNE, DEUX, TROIS! ¡Voilà! ¡El Termidor me está haciendo jugar como un campeón!",
            "¡Magnifique! ¡Me he comido varias de tus fichas de una sola vez! ¡Glup!",
            "¡Eso ha sido una captura digna de mi linaje! Bueno... o del Termidor.",
            "¡Ja! ¡Te he barrido varias fichas, mon ami! ¡Y todavía estoy jugando con una sola copa de ventaja!",
        ],

        TODO_DAMAS: [
            "¡Oh là là! ¡Ahora sólo quedan damas! Esto ya parece una reunión de la corte.",
            "¡Todas fichas grandes! Magnifique. Ahora sí que empieza la verdadera fiesta.",
            "¡Sólo quedan damas, mon ami! Esto se ha puesto mucho más interesante... y mucho más elegante.",
            "¡Hic! ¡Puras damas! Espero que sean más fáciles de manejar que las de la corte francesa."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Esto se está poniendo feo, mon ami... me quedan pocas fichas y muchas ganas de beber.",
            "¡Oh là là! ¡Estamos en las diez de última! Pero todavía puedo remontar. Creo.",
            "Me quedan muy pocas fichas... pero mientras quede Termidor, queda esperanza.",
            "La situación es delicada, sí... pero jamás subestimes a un noble francés ligeramente entonado."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Mon Dieu! ¡Me llevas tres fichas! Esto se está poniendo complicado... pero todavía lo doy vuelta.",
            "Estás ganando por bastante, mon ami. Pero no te emociones: el Termidor todavía tiene algunas sorpresas.",
            "¡Hic! ¡Tres fichas de diferencia! Bueno... eso es sólo una ventaja temporal.",
            "La situación parece desfavorable, pero yo jamás me doy por vencido. Especialmente después de la tercera copa."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Voilà! ¡Tres fichas de ventaja! ¡La partida empieza a tomar el rumbo correcto!",
            "¡Mon ami, esto está casi decidido! El Termidor y yo estamos haciendo un trabajo magnífico.",
            "¡Qué diferencia, por favor! ¡Estoy jugando como un auténtico maestro francés!",
            "¡Hic! ¡Mira cómo va esto! Te llevo varias fichas y todavía me siento perfectamente sobrio.",
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Oh là là! Cuatro contra cuatro... ahora sí, mon ami, el que se equivoque paga la ronda.",
            "Quedan pocas fichas y todo está igualado. ¡Esto se decide con elegancia y precisión!",
            "Estamos en la cornisa, mon ami. Un error y se acabó todo... aunque espero que no sea mío.",
            "¡Cuatro contra cuatro! Esto está más tenso que una negociación entre dos grandes casas nobles. Glup."
        ],

        PARTIDO_LARGO: [
            "¡Por todos los santos! ¡Qué partida tan larga! Necesito una copa nueva para mantener la concentración.",
            "¡Más de ciento diez jugadas! Mon Dieu, esto ya parece un asedio medieval.",
            "¡Hic! ¿Todavía estamos jugando? Yo pensaba que ya habíamos terminado hace como tres copas.",
            "Este partido está durando tanto que temo que mi familia empiece a preguntarse dónde estoy. ¡Otra copa!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Ah, voilà! ¡Por fin sangre en el tablero! Ahora comienza el verdadero combate.",
            "¡Primera captura! Magnifique, mon ami. Ahora sí estamos jugando a las damas.",
            "¡Hic! ¡Ya cayó la primera ficha! Que empiece la fiesta.",
            "¡Por fin! Se acabó la cortesía. Ahora cada ficha cuenta... y cada copa también."
        ],

        COMENTARIO_ALEATORIO: [
            "Los que elogian los grandes vinos de Bordeaux es porque jamás han probado un Termidor como corresponde.",
            "Glup, glup, glup, glup, glup... Ahhh. Ahora sí. Ya estoy pensando con claridad.",
            "En mi familia tenemos castillos, viñedos y una genealogía de siglos... y yo tengo Termidor. Cada uno elige su camino.",
            "Una noche sin vino, sin música y sin alguna decisión cuestionable es una noche desperdiciada, mon ami.",
            "Hic! ¿Sabes qué me enseñó la vida? Que casi cualquier problema puede esperar hasta mañana."
        ],

        INICIO_PARTIDA: [
            "Ah, mon ami... ¿una partida de damas? ¡Por supuesto! Dame un momento para terminar mi copa... glup.",
            "¡Voilà! ¡Comencemos! Aunque debo advertirte que hoy estoy apenas un poquito entonado.",
            "¿Qué mejor manera de pasar la noche que jugando contra un honorable adversario? ¡Traigan el tablero y otro tetra!",
            "Muy bien, mon ami. Comencemos la partida. Hoy me siento particularmente inspirado... probablemente sea el Termidor."
        ]

    },

    // ---- Nivel 3: Leonor de Aquitapia ----

    aquitapia: {

        VICTORIA: [
            "¡Victoria! El reino de Aquitapia vuelve a celebrar. Hay que hablar menos y apoyar un poco más.",
            "¡Ganamos! Mis fichas jugaron como una Selección campeona. ¡Aguante Aquitapia!",
            "Te voy a decir la verdad: este resultado estaba perfectamente planificado. Entre todos lo armamos así."
        ],

        DERROTA: [
            "Bueno... perdí. La próxima voy a traer a Falcón Pérez para que arbitre este torneo.",
            "¿Y acá no te regalan penales? Porque te voy a decir la verdad, así es difícil.",
            "Perdí, pero no pasa nada. En el reino organizamos otro torneo y vemos cómo sale la próxima."
        ],

        EMPATE: [
            "Empate. Ni ganaste ni perdiste. Nos guste o no, estas son las damas que eligieron los habitantes del castillo.",
            "Bueno, quedó en tablas. Hay que valorar el esfuerzo y seguir trabajando entre todos.",
            "Empatamos. Un resultado digno para dos equipos que transpiraron la camiseta... y yo transpiré bastante más que vos."
        ],

        CORONACION_SUFRIDA: [
            "¡Pero mirá la defensa que tengo! ¿Dónde estaban los centrales cuando esa ficha llegó al área?",
            "¡Me coronaron! Mi defensa es un colador, esto no puede estar pasando en el reino.",
            "Te voy a decir la verdad: esa ficha llegó al área con más facilidad que un delantero entrando solo."
        ],

        CORONACION_PROPIA: [
            "¡GOOOOL! Perdón, me entusiasmé. Quise decir: ¡coronación! Otra dama para el reino.",
            "¡Dama propia! Mis jugadoras se mueven por el tablero como verdaderas campeonas.",
            "¡Qué jugada! Esa ficha llegó al fondo y se consagró. Así se juega en el predio de Ezeiza."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡No puede ser! Me están haciendo una goleada de visitante. ¿Dónde está la defensa?",
            "¡Tres fichas de una sola vez! Estoy pasando calor... ¡algún siervo que me seque la nuca, por favor!",
            "Te voy a decir la verdad: eso fue un desastre táctico. Hay que hablar menos y defender un poco más."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Eso fue una goleada! Mis fichas entraron al área y no dejaron ni una marca.",
            "¡Una, dos, tres! ¡Qué manera de jugar! El predio de Ezeiza está orgulloso de estas muchachas.",
            "¡Tremenda jugada colectiva! Entre todas me armaron una captura espectacular."
        ],

        TODO_DAMAS: [
            "Bueno, ahora sí: ¡puro plantel de damas! Esto parece una concentración de la Selección femenina.",
            "¡No quedan fichas chiquitas! Ahora sólo quedan damas en el reino. Esto se puso serio.",
            "Mirá vos... todas damas. Al final este torneo terminó siendo más femenino de lo que esperaba."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "La verdad... estoy complicada. Pero todavía no está terminado el torneo, y acá se transpira hasta el último minuto.",
            "Estamos en las diez de última. Te propongo una cosa: si me dejás empatar, capaz aparece un pequeño sobrecito para vos. Digo, como incentivo deportivo.",
            "Estoy contra las cuerdas, pero no voy a bajar los brazos. Y si hace falta, hacemos una modificación reglamentaria entre todos."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Estoy pasando calor... ¡algún siervo que me seque la nuca, por favor!",
            "Tres fichas abajo. Esto está más complicado que un campeonato mal organizado.",
            "La verdad, no me gusta cómo está el resultado. Pero todavía queda partido y hay que apoyar un poco más.",
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Mirá cómo se mueven mis fichas! Parecen mis doscientos caballos de lujo cruzando el predio de Ezeiza.",
            "Te voy a decir la verdad: este partido viene más tranquilo que una jornada de entrenamiento en el reino.",
            "Tenemos una ventaja importante. Ahora hay que administrar el resultado y jugar con inteligencia."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Cuatro contra cuatro. Esto es como una final: el que se equivoca, se vuelve caminando al castillo.",
            "Estamos en zona de definición. Ahora cada ficha vale como un gol en una final.",
            "La verdad, está para cualquiera. Acá no hay que regalar nada, porque después todos van a transpirar."
        ],

        PARTIDO_LARGO: [
            "¡Más de ciento diez jugadas! Esto ya parece uno de esos torneos eternos que organizamos en el reino.",
            "Qué partido largo, por favor. Estoy transpirando más que en una final de verano.",
            "¿Cuánto falta? Porque a este ritmo vamos a terminar jugando las damas en el próximo reinado."
        ],

        INICIO_HOSTILIDADES: [
            "¡Ahora sí empezó el partido de verdad! Se terminó la diplomacia.",
            "Primera captura. Esto ya es fútbol de alto voltaje, mi amor.",
            "¡Hay sangre en el tablero! Bueno, sangre metafórica. Pero ya empezó la guerra."
        ],

        COMENTARIO_ALEATORIO: [
            "Te voy a decir la verdad: no entiendo por qué dicen que los torneos del reino son turbios. Todas las coimas... perdón, todas las copas han sido ganadas de manera perfectamente justa.",
            "El matrimonio es una estrategia muy importante. Yo pasé a ser reina de Francia, reina de Inglaterra y ahora reina del predio de Ezeiza. Hay que saber negociar.",
            "Hoy mandé a preparar un asado para todo el reino. Porque una cosa es organizar torneos y otra muy distinta es organizar un buen asado.",
            "No entiendo por qué la gente se sorprende de que tenga tantos caballos. Una reina necesita movilidad. Además, ¿vos viste lo que sale mantener un caballo de lujo?",
            "En mi reino siempre decimos lo mismo: hay que hablar menos y apoyar un poco más. Bueno... salvo cuando me preguntan por el reglamento, ahí puedo hablar durante tres horas.",
            "¿Sabés qué tiene de lindo el fútbol y las damas? Que siempre podés decir que fue una cuestión táctica.",
            "A veces pienso que debería dejar todo y dedicarme exclusivamente a los asados. Pero después recuerdo que también hay que administrar el reino.",
            "Hoy hizo tanto calor en Ezeiza que tuve que mandar a buscar tres siervos y dos abanicos. Una reina también tiene derecho a no transpirar.",
            "Nos guste o no, este es el torneo que eligieron los habitantes del castillo. Y si no les gusta, bueno... hacemos otro entre todos.",
            "Una buena reina tiene que saber tres cosas: negociar matrimonios, organizar torneos y conseguir que nunca falte carne en el asado."
        ],

        INICIO_PARTIDA: [
            "Bueno, comienza el torneo. Nos guste o no, estas son las damas que eligieron los habitantes de este castillo.",
            "Que empiece el partido. Entre todos vamos a llevar adelante este gran torneo del reino.",
            "¡Arranca la partida! La verdad, estoy muy contenta de estar acá. Vamos a ver quién termina levantando la copa.",
            "Bueno, vamos a jugar. Y te voy avisando: en mi reino los torneos se organizan seriamente... más o menos.",
            "¡Comienza el partido! Aguante Argentina y aguante el reino de Aquitapia."
        ]

    },

    // ---- Nivel 4: Fray Marolio ----
    marolio: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    },

    // ---- Nivel 5: Icardio de Milán ----
    icardio: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    },

    // ---- Nivel 6: Empecid Campeador ----
    empecid: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    },

    // ---- Nivel 7: Lora Prodigio — ¡ACÁ VAN NOMBRES DE ARCHIVO DE SONIDO, NO TEXTO! ----
    loraprodigio: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    },

    // ---- Nivel 8: Godofredo ----
    godofredo: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    },

    // ---- Nivel 9: Princesa María Eugenia de China ----
    mariaeugenia: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    },

    // ---- Nivel 10: Carlosaúlmagno ----
    carlosaulmagno: {
        VICTORIA: [],
        DERROTA: [],
        EMPATE: [],
        CORONACION_SUFRIDA: [],
        CORONACION_PROPIA: [],
        CAPTURA_MULTIPLE_SUFRIDA: [],
        CAPTURA_MULTIPLE_PROPIA: [],
        TODO_DAMAS: [],
        POCAS_FICHAS_EN_DESVENTAJA: [],
        DIFERENCIA_GRANDE_EN_CONTRA: [],
        DIFERENCIA_GRANDE_A_FAVOR: [],
        PARIDAD_POCAS_FICHAS: [],
        PARTIDO_LARGO: [],
        INICIO_HOSTILIDADES: [],
        COMENTARIO_ALEATORIO: [],
        INICIO_PARTIDA: []
    }

};

// Dado un botId y un código de evento, elige una frase al azar entre
// las que haya cargadas — con probabilidad pareja para todas, sin
// importar cuántas sean. Devuelve null si ese bot no tiene ninguna
// frase cargada todavía para ese evento (lista vacía, o el bot/evento
// ni siquiera existe en el diccionario) — el llamador simplemente no
// muestra nada en ese caso, no hace falta que chequee nada antes de
// llamar a esto.
function pickBotDialogueLine(botId, eventCode) {
    const bot = BOT_DIALOGUE[botId];
    if (!bot) return null;
    const lines = bot[eventCode];
    if (!lines || lines.length === 0) return null;
    return lines[Math.floor(Math.random() * lines.length)];
}
