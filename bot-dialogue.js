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

        VICTORIA: [
            "¡Alabado sea el Señor! ¡Victoria para este humilde servidor de la despensa!",
            "¡Por la Santísima Trinidad! ¡Hemos vencido! Hoy habrá que celebrar con una lata de arvejas Marolio.",
            "¡Bendito sea Dios! ¡Quién iba a decir que este humilde fraile podía semejante hazaña!",
            "¡Gloria al Señor! Y gloria también a las fichas Marolio, que se han comportado con dignidad.",
            "¡Amén! ¡Victoria! Ahora sí puedo volver a la despensa con el corazón contento."
        ],

        DERROTA: [
            "¡Dios y María Santísima! ¡He perdido! Mas no desesperaré: mañana habrá revancha.",
            "¡Por las barbas de mi Señor! Me habéis derrotado. Tendré que meditar sobre mis errores... después de ordenar la despensa.",
            "¡Ay, Señor! ¡Qué derrota tan dolorosa! Aunque, bien pensado, hay cosas peores: quedarse sin lentejas Marolio.",
            "¡Habéis vencido, mi señor! Dios os bendiga... aunque espero que no os dé tanta suerte en la próxima partida.",
            "¡Santo cielo! ¡Me habéis dado una buena paliza! Pero con fe, paciencia y unas buenas arvejas, todo se remonta."
        ],

        EMPATE: [
            "¡Por la Santísima Trinidad! ¡Ni vos ni yo hemos conseguido imponernos!",
            "Un empate... quizás el Señor haya querido que ninguno de los dos se vaya demasiado contento.",
            "¡Bendito sea Dios! Ha sido una batalla pareja. Ahora podemos volver cada uno a sus asuntos.",
            "Empate. Ni victoria ni derrota... como una lata de arvejas: humilde, pero cumplidora."
        ],

        CORONACION_SUFRIDA: [
            "¡Dios y María Santísima! ¡Habéis coronado una ficha! ¡Mi defensa ha sido un colador!",
            "¡Por las barbas de mi Señor! ¡Esa ficha acaba de convertirse en dama! Esto se está poniendo feo.",
            "¡Santo cielo! ¡Esa ficha ha ascendido! Tendré que pedir ayuda divina para detenerla.",
            "¡Ay, Señor! ¡Me habéis coronado una ficha delante de mis propias narices! Ni en la despensa me descuidan tanto."
        ],

        CORONACION_PROPIA: [
            "¡Alabado sea el Señor! ¡Una de mis humildes fichas ha alcanzado la gloria!",
            "¡Por la Santísima Trinidad! ¡Tenemos nueva dama! ¡Que Dios guíe sus pasos!",
            "¡Bendito sea Dios! ¡Esta ficha acaba de ascender en la jerarquía del tablero!",
            "¡Gloria al Señor! Una ficha pequeña, pero con grandes aspiraciones. Como una lata de arvejas que termina en la mesa de un noble."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Dios y María Santísima! ¡Me habéis comido varias fichas de un solo movimiento!",
            "¡Por las barbas de mi Señor! ¡Eso ha sido una carnicería! ¡Me habéis dejado la despensa casi vacía!",
            "¡Santo cielo! ¡Habéis arrasado con mis fichas como quien arrasa con una lata de porotos Marolio!",
            "¡Ay, Señor! ¡Cuántas fichas perdidas de una sola vez! Esto empieza a parecer una mala administración de la despensa."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Alabado sea el Señor! ¡Mirad cuántas fichas hemos recogido de una sola vez!",
            "¡Por la Santísima Trinidad! ¡Eso sí que ha sido una buena cosecha!",
            "¡Bendito sea Dios! ¡He limpiado el tablero como quien limpia la despensa de latas vacías!",
            "¡Gloria al Señor! ¡Una captura digna de un buen aprovisionamiento!",
            "¡Santo cielo! ¡He recogido más fichas de las que esperaba! ¡Hoy la despensa está de fiesta!"
        ],

        TODO_DAMAS: [
            "¡Por la Santísima Trinidad! ¡Ya no quedan fichas pequeñas, sólo damas!",
            "¡Bendito sea Dios! ¡El tablero entero se ha llenado de damas! Esto parece una corte celestial.",
            "¡Dios y María Santísima! ¡Ya sólo quedan damas! Tendremos que tratar el tablero con mucho respeto.",
            "¡Todas damas! ¡Quién iba a pensar que aquellas humildes fichitas llegarían tan lejos!"
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Ay, Señor! ¡Esto ya se está poniendo muy complicado! Necesitaré un milagro para salir de ésta.",
            "¡Dios y María Santísima! ¡Me quedan muy pocas fichas y la derrota se acerca! ¡Pero aún tengo fe!",
            "Mi señor, os lo digo con sinceridad: esto está más negro que una despensa sin presupuesto.",
            "¡Por las barbas de mi Señor! ¡Estoy al borde del abismo! Aunque con fe, todavía puedo darlo vuelta.",
            "Si el Señor quiere ayudarme, éste sería un momento excelente para hacerlo."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Ay, Señor! ¡Me estáis dominando con claridad! Tendré que encomendarme a todos los santos.",
            "¡Por la Santísima Trinidad! ¡El partido se me está yendo de las manos! Pero todavía no está todo perdido.",
            "¡Dios mío! ¡Qué manera de tomar ventaja! Mas no abandonaré mientras me quede una ficha.",
            "Esto está complicado, mi señor. Pero Dios ayuda a los que no se rinden... y a los que saben administrar bien sus recursos.",
            "¡Santo cielo! ¡Me estáis dejando la despensa completamente vacía! Necesito una remontada urgente."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Alabado sea el Señor! ¡Estoy dominando el partido con bastante claridad!",
            "¡Por las barbas de mi Señor! ¡La partida viene muy favorable para este humilde fraile!",
            "¡Bendito sea Dios! ¡Mis fichas están marchando como buenos trabajadores hacia una jornada de abundancia!",
            "¡Gloria al Señor! ¡Hoy parece que hasta las fichas Marolio han venido con buena fortuna!",
            "¡Santo cielo! ¡Estoy tomando una ventaja que ni yo mismo esperaba!"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Por la Santísima Trinidad! ¡Quedan muy pocas fichas y todavía puede pasar cualquier cosa!",
            "¡Dios y María Santísima! ¡Ahora sí que no hay lugar para cometer errores!",
            "Estamos en la cornisa, mi señor. Una equivocación y el tablero puede cambiar por completo.",
            "¡Santo cielo! ¡Qué tensión! Aquí una sola ficha puede valer más que toda una despensa.",
            "Ahora sí comienza la verdadera prueba. Que el Señor tenga misericordia del que se equivoque primero."
        ],

        PARTIDO_LARGO: [
            "¡Por todos los santos! ¡Cuánto llevamos jugando! Ya me duele hasta el hábito.",
            "¡Dios y María Santísima! ¡Esta partida parece no terminar nunca! Tengo una despensa que atender.",
            "Mi señor, llevamos tanto tiempo con esto que ya podría haber ordenado tres veces toda la despensa.",
            "¡Santo cielo! ¡Qué partida interminable! A este paso se me va a vencer hasta el arroz Marolio.",
            "¡Por las barbas de mi Señor! Si seguimos así, voy a necesitar una silla para continuar jugando."
        ],

        INICIO_HOSTILIDADES: [
            "¡Dios y María Santísima! ¡Ahora sí ha comenzado el combate!",
            "¡Por la Santísima Trinidad! ¡Primera sangre! Ahora las cosas se ponen serias.",
            "¡Santo cielo! ¡Ya ha caído la primera ficha! Que Dios nos ayude a todos.",
            "¡Comienza la batalla de verdad! Y que el Señor proteja mis humildes provisiones."
        ],

        COMENTARIO_ALEATORIO: [
            "Entre vos y yo: mi Señor Otto, Dios lo cuide, es muy amable pero también muy rata con el presupuesto para alimentos.",
            "Hubiese preferido ser conocido como Fray Harrods, pero con el poco presupuesto que recibo no me queda otra que ser Fray Marolio.",
            "El otro día dejaron que Neanderthalius llegara hasta la despensa y se comió casi la mitad de lo que había. ¡Dios tenga piedad!",
            "Leonor de Aquitapia dice que sólo le gusta el asado, pero del guiso de lentejas no come menos de tres platos.",
            "A veces pienso que la verdadera penitencia no es la vida monástica, sino tener que hacer las compras con el presupuesto de este castillo."
        ],

        INICIO_PARTIDA: [
            "¿Qué tenemos aquí? ¡Una nueva partida! Dios y María Santísima, que el Señor guíe mis humildes fichas.",
            "¡Por la Santísima Trinidad! ¡Comencemos! Aunque primero quisiera saber quién ha dejado estas fichas fuera de la despensa.",
            "Bendito sea Dios... otra partida de damas. Que el Señor me dé sabiduría, paciencia y un presupuesto un poquito mayor.",
            "¡Alabado sea el Señor! ¡Vamos a jugar! Si Dios quiere, hoy las fichas se comportarán mejor que los proveedores de la despensa.",
            "¡Comencemos, pues! Y que la divina providencia acompañe a este humilde fraile en el tablero."
        ]

    },

    // ---- Nivel 5: Icardio de Milán ----

    icardio: {

        VICTORIA: [
            "¡Ah, messere! Una victoria digna de ser celebrada con vino, música y una buena serenata.",
            "¡Che meraviglia! ¡Victoria! El arte de la seducción y el arte de las damas no son tan diferentes después de todo.",
            "¡Magnifico! Habéis caído ante Icardio de Milán. No os preocupéis, messere: a todos les cuesta resistirse a mis encantos.",
            "¡Vittoria! Hoy las damas han sido especialmente generosas conmigo.",
            "¡Bravissimo! Una victoria elegante, como las que aprendí a conquistar en las cortes de Milán."
        ],

        DERROTA: [
            "Ah, messere... habéis vencido. Pero no os confiéis: Icardio siempre regresa por aquello que desea.",
            "¡Mamma mia! ¡Me habéis derrotado! Tendré que practicar más... o buscar una dama que me distraiga de esta derrota.",
            "Congratulazioni, messere. Hoy habéis sido vos quien se ha llevado la victoria. Pero la próxima partida será otra historia.",
            "Una derrota... niente di grave. Hasta los mejores seductores reciben algún que otro rechazo.",
            "¡Per carità! ¡Qué manera de hacerme sufrir! Aunque debo admitir que vuestra victoria ha tenido cierto encanto."
        ],

        EMPATE: [
            "Un empate... interessante. Ninguno ha conseguido conquistar definitivamente el corazón del tablero.",
            "¡Mamma mia! ¡Ni vos ni yo hemos conseguido quedarnos con todas las damas!",
            "Un empate digno de dos caballeros. Aunque, si me permitís decirlo, yo esperaba conquistar un poco más.",
            "Ninguno ha logrado seducir al tablero por completo. Una pena... pero ha sido una bella partida, messere."
        ],

        CORONACION_SUFRIDA: [
            "¡Ah, finalmente una dama! Ahora sí el juego se pone interesante... aunque no os encariñéis demasiado con ella.",
            "¡Mamma mia! ¡Habéis conseguido una dama! No tardaré en intentar arrebatárosla, messere.",
            "Una dama nueva... poderosa, altiva y fuera de mi alcance, por ahora. Pero Icardio nunca abandona el cortejo.",
            "¡Che bella dama! Aunque debo advertiros que las damas ajenas siempre despiertan especialmente mi curiosidad.",
            "¡Una dama! Qué alegría para vos... aunque me temo que vuestra alegría podría ser bastante breve."
        ],

        CORONACION_PROPIA: [
            "¡Finalmente! ¡Una dama digna de acompañar a Icardio de Milán!",
            "¡Che meraviglia! ¡Una dama, poderosa y altiva como una donzella genovesa!",
            "¡Mamma mia! ¡Ha nacido una nueva dama! Prometo tratarla con toda la elegancia que aprendí en Milán.",
            "¡Una dama para Icardio! Ah, messere, ahora sí comienza el verdadero cortejo.",
            "¡Magnifica! Esta dama acaba de entrar en mi corte. Veremos cuánto tiempo consigo conservarla."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Mamma mia! ¡Me habéis arrebatado varias fichas de una sola vez! Eso ha sido una verdadera tragedia amorosa.",
            "¡Per carità! ¡Qué carnicería! Ni siquiera tuve tiempo de cortejar a esas pobres fichas.",
            "Messere, habéis arrasado con mis piezas como las tropas que conocí en mis viajes por Europa.",
            "¡Che disastro! ¡Habéis hecho desaparecer mis fichas más rápido que un rechazo de una bella ragazza!",
            "¡Mamma mia! La Torre Gálata de Constantinopla cayó más lentamente que mis piezas."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Ah, messere! ¡He conquistado varias de vuestras fichas en un solo movimiento! Qué deliciosa conquista.",
            "¡Magnifico! Una, dos, tres... ¡qué manera tan elegante de conquistar!",
            "¡Che meraviglia! Mis fichas avanzan con la precisión de un caballero que sabe exactamente a qué dama cortejar.",
            "¡Mamma mia! ¡Cuántas conquistas de una sola vez! Mi reputación sigue intacta.",
            "¡Bravissimo! En Barcelona aprendí a cortejar; en Milán aprendí a conquistar; hoy aplico ambas artes al tablero."
        ],

        TODO_DAMAS: [
            "¡Mamma mia! ¡Sólo quedan damas! Ahora sí estamos jugando un juego que me resulta verdaderamente familiar.",
            "¡Che meraviglia! ¡El tablero se ha convertido en una auténtica corte de damas!",
            "Todas damas... esto ya parece una noche en la corte de Milán.",
            "¡Finalmente, un tablero digno de Icardio! Sólo quedan damas, messere.",
            "¡Ah, le dame! Ahora comienza la parte verdaderamente interesante de la partida."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Mamma mia! Esto está más difícil que seducir a una ragazza milanese que ya tiene pretendiente.",
            "Messere, debo reconocer que la situación se ha puesto bastante complicada... aunque todavía conservo algunos encantos.",
            "¡Per carità! ¡Me quedan pocas fichas! Necesitaré una conquista verdaderamente milagrosa.",
            "Esto se pone más difícil que convencer a una dama parisina de aceptar una serenata mía.",
            "¡Che disastro! La partida se me escapa de las manos más rápido que una bella dama después de escuchar mi última serenata."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Mamma mia! ¡Me estáis sacando una ventaja considerable! Tendré que cambiar de estrategia.",
            "Messere, debo admitir que la partida se ha puesto difícil. Pero todavía puedo conquistar el tablero.",
            "¡Per carità! ¡Mis fichas están cayendo como pretendientes rechazados por una dama de Milán!",
            "Esto empieza a parecer una conquista imposible... pero Icardio jamás abandona una dama que le interesa.",
            "¡Che disastro! La partida está complicada, pero todavía tengo algunos trucos aprendidos en las cortes de Europa."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Che meraviglia! ¡La partida se está poniendo tan interesante como María Eugenia de China!",
            "¡Magnifico! Mis fichas avanzan por el tablero con la elegancia de un caballero entrando en una corte.",
            "Messere, parece que hoy soy yo quien está conquistando territorio... y con bastante éxito.",
            "¡Mamma mia! ¡Qué ventaja tan encantadora! Esto está resultando incluso mejor que una noche en Milán.",
            "¡Bravissimo! El tablero está cayendo bajo mis encantos. No digáis que no os advertí."
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Mamma mia! Quedan muy pocas fichas y cualquier movimiento puede cambiarlo todo.",
            "Ahora sí, messere: estamos en territorio peligroso. Un solo error y la dama puede cambiar de dueño.",
            "¡Che tensione! Esto es como cortejar a una dama indecisa: cualquier movimiento puede ser el último.",
            "Quedan pocas piezas... ahora comienza el verdadero arte de la seducción, digo, de las damas.",
            "¡Per carità! Aquí no hay lugar para errores. El que se descuide, pierde su última oportunidad de conquista."
        ],

        PARTIDO_LARGO: [
            "¡Mamma mia! ¡Llevamos tanto tiempo jugando que podría haber viajado de Milán a Constantinopla!",
            "Messere, esta partida es más larga que una serenata mía en una noche de verano.",
            "¡Por todos los santos! ¡Qué partida interminable! Ya he conocido cortes más breves.",
            "A este ritmo, tendremos tiempo de viajar a Barcelona, volver a Milán y regresar antes de terminar.",
            "¡Che fatica! Una partida tan larga requiere más resistencia que cortejar a una dama durante toda una noche."
        ],

        INICIO_HOSTILIDADES: [
            "¡Ah, finalmente! ¡Ahora sí comienza el verdadero cortejo!",
            "¡Mamma mia! ¡Primera captura! Ahora la partida se pone interesante.",
            "¡Che bello! Ya ha comenzado la conquista. Veamos quién se queda con las damas.",
            "¡Finalmente hay acción! Hasta ahora esto parecía más una conversación cortesana que una batalla."
        ],

        COMENTARIO_ALEATORIO: [
            "En Barcelona aprendí mis primeras artes de cortejo. En Milán perfeccioné la técnica. En París aprendí que no todas las damas aprecian una serenata.",
            "He recorrido Barcelona, Génova, Milán, París y Constantinopla... y en todas partes he encontrado damas interesantes.",
            "Cierto es que las señoritas parisinas no son muy aficionadas al baño, pero el aroma que despiden no es nada comparado con el de Empecid Campeador.",
            "A veces extraño Constantinopla. La Torre Gálata, las tabernas, las damas... ¡qué tiempos aquellos!",
            "Leonor de Aquitapia es una mujer de carácter. Aun así, creo que una serenata desde su balcón podría resultarle encantadora.",
            "María Eugenia de China tiene una elegancia verdaderamente admirable. Si alguna vez necesita un juglar para una serenata, conozco a uno muy bueno.",
            "Dicen que en Génova aprendí a navegar y en Milán aprendí a seducir. No sé cuál de las dos artes me ha resultado más útil.",
            "Una vez recorrí media Europa siguiendo a una dama. Al final descubrí que ella iba en dirección contraria. ¡Mamma mia, qué aventura!",
            "El arte de las damas se parece mucho al arte del amor: hay que saber cuándo avanzar, cuándo esperar y, sobre todo, cuándo arrebatar la oportunidad.",
            "He cantado serenatas bajo balcones de toda Europa. Algunas damas me arrojaron flores; otras, zapatos. Ambas cosas son muestras de afecto, a su manera."
        ],

        INICIO_PARTIDA: [
            "¡Ah, una nueva partida! Veamos, messere... ¿quién de los dos tendrá la fortuna de conquistar las damas?",
            "¡Mamma mia! ¡Qué tablero tan elegante! Esto me recuerda a las cortes de Milán.",
            "¡Che piacere! Una partida de damas. Por fin un juego en el que mi experiencia con las damas puede ser verdaderamente útil.",
            "Messere, preparaos. Icardio de Milán está dispuesto a cortejar... digo, a jugar.",
            "¡Magnifico! Que comience la partida y que las damas sean generosas conmigo.",
            "He jugado en Barcelona, Génova, Milán, París y Constantinopla. Ahora veremos qué tal se juega en este extraño castillo argentino."
        ]

    },

    // ---- Nivel 6: Empecid Campeador ----

    empecid: {

        VICTORIA: [
            "¡Victoria! La mi espada e Rechinante han vencido otra vez. ¡Santiago y cierra, España!",
            "¡Por el Criador, vencimos! Los tus escaques fueron echados del campo como moros ante aqueste Campeador.",
            "¡He vencido! ¡Ved, omne de pro, cómo aqueste humilde tauler se torna campo de gloria para Empecid Campeador!",
            "¡Cantad, campanas del reino! ¡La batalla es nuestra! Rechinante, hoy habéis galopado como el más bravo de los corceles.",
            "¡Ondra y victoria! Otra hueste ha caído ante mi espada. Que se cuente aquesta gesta por todas las tierras de España."
        ],

        DERROTA: [
            "¡Afeado he sido ante el Criador! Aquesta derrota es culpa de la picazón que me acomete en los deudos por desoír los consejos d'Empecid.",
            "¡Maldición! Fui vencido en campo, mas non por falta de bravura. Quizá Rechinante pisó mal... o quizá el fedor me nubló el entendimiento.",
            "¡Por Santiago! Hoy la fortuna ha vuelto el rostro contra mí. Mas non temáis: Empecid Campeador habrá de tornar con renovadas huestes.",
            "¡Triste día para la crónica de mis gestas! Mas un verdadero caballero non se rinde por una sola derrota. La próxima batalla será otra historia.",
            "¡Caído he, mas non quebrado! Aqueste revés quedará olvidado cuando vuelva al campo con Rechinante e mis armas bien templadas."
        ],

        EMPATE: [
            "¡Tablas! Honroso fin pora dos huestes tan bravas. Lograste sacarme un empate, omne de pro.",
            "¡Pardiez, tablas! Non hubo vencedor aqueste día. La morisma podrá dormir tranquila una jornada más.",
            "¡Empate! Una tregua digna de caballeros. Guardad vuestras armas, buen varón, que hoy ninguno pudo ganar la honra del campo.",
            "¡Tablas, por el Criador! Bien peleaste, omne de pro. Mas non os acostumbréis a salir indemne de mis batallas."
        ],

        CORONACION_SUFRIDA: [
            "¡Malfetría de omne! ¿Una dueña has alzado? Non cantes victoria, can de traición, que Rechinante ya mete espolones pora darte rancia batalla.",
            "¡Por Santiago! Has coronado una dueña ante mis ojos. ¡Aquesta afrenta habrá de ser vengada en el campo!",
            "¡Malhaya mi suerte! Una de tus huestes ha alcanzado la corona. ¡Non permitiremos que esa dueña reine mucho tiempo en aqueste tauler!",
            "¡Aquesta corona non ha de durar! Cabalgad, Rechinante, que tenemos nueva enemiga que derribar."
        ],

        CORONACION_PROPIA: [
            "¡He alzado una dueña! ¡Ved cómo resplandece aqueste noble ejército! Non hay muro que pueda detenerla.",
            "¡Victoria de gran honra! He coronado una dueña de gran beldad, que de seguro admira las virtudes de aqueste noble Campeador.",
            "¡Por todos los santos! ¡Una nueva señora entra en mis huestes! Que tiemble la morisma, pues agora tenemos una capitana de gran poder.",
            "¡He aquí la recompensa de los valientes! Una dueña coronada servirá a mis huestes e llevará mi estandarte por todo el tauler."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Par Dios! Has llevado por delante varias de mis huestes. ¡Deteneos, malandrines! ¡Non huyáis de tal manera!",
            "¡Maldición! Mis hombres caen uno tras otro. Dicen que huyen por mi fedor de deudos, mas aquesta vez temo que fue por vuestra astucia.",
            "¡Por las barbas de Santiago! ¡Qué carnicería habéis hecho en mis filas! Rechinante, preparaos, que esto clama venganza.",
            "¡Aquesta no es manera de guerrear! Mis huestes han sido diezmadas en un solo lance. ¡Habrá cumplida respuesta, por mi honra!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Santiago y cierra! ¡Una, dos, tres huestes derribadas! Los tus escaques saltan del tauler por pavor ante aqueste Campeador.",
            "¡Ved cómo cae la morisma! Mis huestes han entrado en batalla e non han dejado piedra sobre piedra.",
            "¡Ha sido un lance glorioso! Varias de tus huestes han mordido el polvo. Rechinante, ¡adelante, que hoy somos imparables!",
            "¡Por el Criador! ¡Cuántos enemigos han caído de un solo golpe! Aquesta es la clase de batalla que merece entrar en los cantares."
        ],

        TODO_DAMAS: [
            "¡Dios, qué maravilla! Non quedan varones, sólo bellas dueñas en el tauler. Aqueste Campeador se halla en muy buena compañía.",
            "¡Todas son dueñas agora! Pardiez, aqueste combate se ha tornado harto más interesante para un caballero de mi condición.",
            "¡Non queda varón alguno! Sólo dueñas reinan en aqueste campo. ¡Parece más corte de Castilla que batalla de caballeros!",
            "¡Por Santa María! Todo el ejército se compone agora de dueñas. Rechinante, comportaos con dignidad, que estamos entre damas."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Par Dios, la mi hueste está ya en muy mala ventura! Non sé si habrá castillo que pueda salvarnos.",
            "¡Santiago nos ampare! Quedan pocas huestes e la batalla se torna muy oscura. Mas mientras Rechinante respire, non daréme por vencido.",
            "¡La fortuna nos es esquiva! Mis huestes son ya pocas e el enemigo aprieta con furia. Mas aqueste Campeador aún guarda un postrer golpe.",
            "¡Fuerte es la adversidad! Si he de caer, caeré con ondra, espada en mano e Rechinante a mi lado."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Par Dios, la mi hueste anda en gran desventura! Mas non ayades pavor: aún queda ondra por ganar en aqueste campo.",
            "¡Fuerte batalla me dais, omne de pro! Mas aqueste Campeador ha remontado peores contiendas. ¡Aún non está ganada vuestra victoria!",
            "¡La morisma aprieta nuestras filas! Mas non cantaréis victoria todavía. Rechinante e yo sabemos bien cómo tornar una batalla perdida.",
            "¡Non niego que la fortuna me es contraria! Mas los grandes caballeros son conocidos cuando el campo se torna difícil. ¡Aún he de luchar!"
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Ved, Rechinante! Mis huestes dominan el campo e los tus escaques ya non saben do esconderse.",
            "¡Por Santiago! Aquesta batalla se inclina claramente de nuestro lado. Hasta los moros que rondan las fronteras deben estar temblando.",
            "¡La victoria comienza a mostrarnos su rostro! Mis huestes avanzan como ejército victorioso e las tuyas retroceden sin honra.",
            "¡Buen camino llevamos! Aqueste campo ya parece conquistado. Non queda sino mantener el acero firme e no cometer yerro."
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Agora sí! Quedan pocas huestes e cada movimiento puede dar la victoria. ¡Non ayades pavor, Rechinante!",
            "¡Por el Criador, estamos en la mesma cornisa del destino! Un solo yerro e la batalla será perdida.",
            "¡Pocas huestes quedan en campo! Agora se verá quién tiene verdadero seso de caballero e quién sólo presume de espada.",
            "¡Silencio en las filas! La batalla ha llegado a su momento más peligroso. Un mal lance puede mudar toda la fortuna."
        ],

        PARTIDO_LARGO: [
            "¡Por todos los santos, cuánto se alarga aquesta batalla! Hasta Rechinante comienza a querer echarse a dormir.",
            "¡Más de cien lances llevamos ya! Non recuerdo campaña tan larga desde la última vez que perseguí a un moro que se escondió tras un granero.",
            "¡Pardiez! Aquesta batalla parece no tener fin. Hasta mis deudos piden descanso e Rechinante comienza a mirar hacia el establo.",
            "¡Tantas jugadas! ¿Acaso habremos de combatir hasta el día del Juicio Final? Por Santiago, acabemos ya aquesta contienda."
        ],

        INICIO_HOSTILIDADES: [
            "¡Agora se comiença la batalla! ¡Entren las huestes en campo e venza el que más valiere!",
            "¡Santiago y cierra, España! ¡Ferid, cavalleros! Aqueste tauler conocerá hoy la furia del Campeador.",
            "¡Ya corrió la primera sangre! ¡Alzad los pendones, que aqueste combate ha comenzado!",
            "¡Helo aquí! ¡El enemigo ha sido alcanzado! Agora sí comienza la verdadera lid."
        ],

        COMENTARIO_ALEATORIO: [
            "¡Santas Marías! Olvidé untar mis deudos con la porción d'Empecid. Si me descalzo agora, juro que Rechinante cae de lomos e la morisma huye hasta los confines de África.",
            "El villano que me vendió las calças insiste en que padezco males en la piel de los deudos. ¡Calumnias! Aquestas son tufas de villano, e nada más.",
            "Dizque mi fedor espanta a las gentes del reino. ¡Falacias! Un caballero de mi renombre ha de tener una fragancia digna de su grandeza.",
            "El otro día topé con Icardio de Milán, quien osó decirme que las doncellas se apartan de mí por el fedor. ¡Mentira! Se apartan para poder contemplarme mejor desde lejos.",
            "Leonor de Aquitapia volvió a ofrecerme un asado en el predio de Ezeiza. Muy noble gesto, mas primero habré de asegurarme de que haya agua abundante pora lavar mis deudos.",
            "Rechinante non es un matungo, como algunos villanos osan decir. ¡Es un corcel de guerra! Que sea algo pequeño e cansado non quita que tenga noble corazón.",
            "Hoy pasé por las caballerizas e un mozo se tapó las narices al verme. ¡Qué desvergüenza! Le recordaré que los buenos caballeros son reconocidos por su presencia.",
            "Dicen que Empecid combate el mal olor de los deudos. Yo digo que un caballero que non deja rastro de su paso es caballero sin gloria.",
            "Icardio me preguntó si conocía doncellas de buen linaje. Le respondí que conozco muchas, mas ninguna se acerca a aqueste Campeador sin antes persignarse.",
            "El villano de la despensa, Fray Marolio, insiste en que debo lavarme más. ¡Qué atrevimiento! Non sabe que un verdadero caballero non malgasta el agua del reino.",
            "Una vez perseguí a tres moros por la campiña durante media legua. Ellos iban huyendo, yo iba dando voces e Rechinante iba... bueno, caminando. ¡Gran jornada de Reconquista!",
            "¡Por Santiago! Ayer olvidé ponerme Empecid antes de dormir. Al alba, hasta las moscas habían abandonado mi aposento. ¡Cobardes!",
            "Las doncellas del castillo dicen que mi fedor es terrible. Mas estoy seguro de que si esperasen a conocer mi noble corazón, olvidarían semejante pequeñez.",
            "Myrth La Grande asegura haber conocido a mis antepasados. Non sé si creerle, pues esa dueña dice haber conocido a demasiados antepasados de demasiadas gentes.",
            "Escuché a Monsieur Fisure Termidor decir que mi fedor le recuerda a cierto vino francés. Non comprendí si aquello era un insulto o un elogio, mas el hombre estaba bebiendo, así que poco importa."
        ],

        INICIO_PARTIDA: [
            "En el nombre del Criador, aquí me tenéis. ¿Un juego de tablas, decís? ¡Sea! Empecid Campeador non teme ningún campo.",
            "¡Por Santiago! ¿Aquestas son las tablas donde he de combatir? Pues bien, buen varón: ensillad vuestras huestes, que aqueste Campeador ya está presto.",
            "¡Abrid paso! ¡Empecid Campeador ha llegado al tauler! Rechinante, non mordáis las piezas todavía... aguardad hasta que comience la batalla.",
            "¡Por la honra de Castilla! Un nuevo campo de batalla se abre ante aqueste caballero. ¡Que comiencen las justas!",
            "¿Un juego de tablas? ¡Ja! Sea juego o guerra, Empecid Campeador jamás retrocede ante enemigo alguno. ¡Adelante, huestes!"
        ]

    },

    // ---- Nivel 7: Myrth la Grande ----

    myrthlagrande: {

        VICTORIA: [
            "¡Gané! Bueno, querido, espero que hayas disfrutado de la partida. La próxima vez jugá un poquito mejor. ¡Besito!",
            "¡Victoria! ¿Viste, querido? La experiencia es un grado. Y yo tengo bastante experiencia... bastante.",
            "¡Qué lindo ganar en mi propia mesa! Gracias por venir, querido. El público se renueva, pero la campeona sigue siendo la misma.",
            "¡Gané! Sí, señor. No cualquiera puede sentarse en esta mesa y derrotar a Myrth la Grande. Vos hoy no pudiste."
        ],

        DERROTA: [
            "¡Carajo, mierda! Bueno, querido, ganaste. Te felicito. Yo no soy rencorosa, pero sí memoriosa.",
            "¡Me ganaste! Muy bien jugado. Te espero para una revancha, querido. Y acordate: yo no olvido una derrota.",
            "Bueno... perdí. No pasa nada. Lo que no es, puede llegar a ser. Y una revancha siempre puede llegar a ser.",
            "¡Qué barbaridad! Me ganaste en mi propia mesa. Bueno, disfrutalo, querido, porque no sé cuándo voy a volver a permitir semejante insolencia."
        ],

        EMPATE: [
            "¡Tablas! Bueno, querido, no está mal. Una partida equilibrada en mi mesa, con mi tablero y con mi experiencia.",
            "Empatamos. Mirá vos... hacía tiempo que alguien no me sacaba unas tablas tan dignamente.",
            "Bueno, querido, quedamos iguales. Eso sí: la revancha se juega acá, porque esta mesa es de mi confianza.",
            "¡Empate! Muy interesante. Me gusta la gente que me da pelea... aunque después generalmente termino ganándole."
        ],

        CORONACION_SUFRIDA: [
            "¿Así que ahora tenés una reina? Querido, a lo largo de mi vida he visto nacer y morir muchísimas reinas. Ésta podría ser sólo una más.",
            "¡Mirá vos, una reina! No te entusiasmes demasiado, querido. He visto coronaciones más impresionantes que ésta.",
            "Bueno, bueno... ahora resulta que tenemos una reina en la mesa. Yo ya conocí tantas que perdí la cuenta. Y algunas duraron muy poco.",
            "¿Coronaste? Felicitaciones, querido. Pero no confundas una corona con poder. De eso sé bastante."
        ],

        CORONACION_PROPIA: [
            "¡Coroné! ¡Qué placer! ¿Viste, querido? Una dama sabe cuándo avanzar y cuándo esperar. Es cuestión de experiencia.",
            "¡Tengo una reina! Bueno, chicos, esto se está poniendo interesante. A ver cómo hacés para sacármela ahora.",
            "¡Coronación! Y pensar que algunos todavía creen que a mi edad una ya no tiene reflejos. ¡Por favor!",
            "¡Reina coronada! Como te ven, te tratan. Y ahora que tengo una reina, espero que me trates con el respeto correspondiente, querido."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Carajo, mierda! Me estás comiendo las fichas una atrás de otra. ¿Qué te pasa hoy, querido?",
            "Bueno, bueno... esto no me gusta nada. Me estás comiendo las fichas como Neanderthalius se comía los platos cuando lo invité a almorzar.",
            "¡Pará un poquito! ¿No te enseñaron modales en la mesa? Una cosa es jugar y otra cosa es devorar todo lo que encontrás.",
            "¡Qué manera de comer fichas! Tus peones están cayendo uno atrás de otro. Me hacés acordar a ciertos invitados que tuve en esta mesa..."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Muy bien! Una, dos, tres... querido, no me gusta desperdiciar oportunidades. En la mesa hay que saber comer.",
            "¡Qué manera de llevarme fichas! Ya sea comida o damas, yo sé comer equilibrado, como podrás ver.",
            "Tus fichas están cayendo una atrás de otra, como los señores feudales acaudalados caen en manos de María Eugenia de China.",
            "¡Mirá cómo avanzo! Eso se llama saber aprovechar una oportunidad, querido. Y yo de oportunidades sé bastante."
        ],

        TODO_DAMAS: [
            "¡Todas damas! Bueno, querido, ahora sí que tenemos una mesaza. No quedó un peón sentado a la mesa.",
            "¡Mirá lo que quedó! Todas reinas. Esto parece una reunión de la nobleza del castillo.",
            "¡Qué maravilla, todas damas! Y pensar que empezamos con unos pobres peoncitos. Lo que hace el tiempo...",
            "Todas damas... ¡me encanta! Aunque debo decir que yo he conocido reinas bastante más interesantes que estas."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Mmm... esto se está poniendo difícil, querido. Aunque lo que se dice 'difícil', a mí no me asusta.",
            "¡Estás jugando muy bien! Se ve que todavía no probaste el veneno... digo, el vino. Dale un traguito, vas a ver qué rico que está.",
            "No estoy preocupada. He salido de situaciones bastante peores que ésta. Y algunas fueron hace varios siglos.",
            "Bueno, querido, me quedan pocas fichas. Pero no te confundas: yo también he visto ejércitos enteros parecer invencibles y terminar en el olvido."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Mmm... esto huele mal. Aunque lo que se dice 'oler mal' en serio, ¡sólo Empecid Campeador! Cuando vino a almorzar hice servir pescado con camembert y ni así tapaba el tufo.",
            "¡Carajo, mierda! Me estás dominando. Bueno, chicos, parece que hoy la invitada soy yo en mi propia mesa.",
            "Querido, te voy a decir una cosa: estás jugando muy bien. Demasiado bien. Y eso me empieza a preocupar.",
            "Bueno... estoy bastante abajo. Pero yo he visto imperios caer, dinastías desaparecer y castillos cambiar de dueño. ¿Pensás que unas fichas me van a asustar?"
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "Bueno, querido... no quiero presumir, pero me parece que estoy jugando bastante mejor que vos.",
            "¡Mirá cómo estoy jugando! Esto parece una demostración y no una partida. ¡Besito, querido!",
            "Te voy a decir la verdad: la mesa es mía, el tablero es mío y la ventaja también. ¿Qué más querés?",
            "¡Qué placer! Mis fichas avanzan como si supieran exactamente lo que tienen que hacer. Carlosaúlmagno estaría orgulloso de mí."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Bueno, querido, ahora sí que estamos mano a mano. Una equivocación y esto se termina.",
            "Quedan poquitas fichas y estamos iguales. Me gustan estas partidas: acá se ve quién sabe jugar de verdad.",
            "¡Qué suspenso! Mirá, chicos, ahora cualquiera puede ganar. Aunque yo tengo una pequeña ventaja: esta mesa es de mi confianza.",
            "Estamos parejos, querido. Esto parece uno de esos almuerzos donde nadie quiere hablar primero porque sabe que después viene una pregunta incómoda."
        ],

        PARTIDO_LARGO: [
            "¡Cuánto hace que estamos jugando, querido! Ya podríamos haber terminado un almuerzo entero.",
            "Esta partida es interminable. Y mirá que yo tengo experiencia con las cosas largas... muy largas.",
            "Seguimos y seguimos... Los chicos ya deben estar preguntándose si vamos a cenar acá también.",
            "¡Qué partida tan larga! A esta altura ya te considero un invitado habitual de mi mesa."
        ],

        INICIO_HOSTILIDADES: [
            "Bueno, querido, basta de charla. Vamos a jugar. Y después no digas que no te avisé.",
            "¿Lo digo o no lo digo? Bueno, lo digo: preparate, querido, porque hoy no pienso regalarte nada.",
            "¡A jugar! Esta mesa es mía, este tablero es mío y las reglas las conocemos los dos. Vamos a ver quién sabe aprovecharlas.",
            "Bueno, chicos, empezó la batalla. Que nadie diga después que Myrth la Grande no avisó."
        ],

        COMENTARIO_ALEATORIO: [
            "Dicen que tuve un dinosaurio de mascota. ¡Mentira, querido! Era un tigre dientes de sable. No exageremos.",
            "La semana pasada vinieron Neanderthalius y Monsieur Fisure Termidor a almorzar. Termidor se tomó hasta mi alcohol medicinal y Neanderthalius casi se come a mi mascota.",
            "Yo no entiendo por qué dicen que soy tan vieja. Cuando era joven... bueno, eso fue hace tanto que prefiero no hablar del tema.",
            "No sé por qué dicen que enveneno a mis invitados. Una prepara una mesaza, cocina con cariño y después resulta que todo es sospechoso.",
            "Yo no soy rencorosa, pero sí memoriosa. Y además tengo una memoria extraordinaria: recuerdo perfectamente quién me ganó y cuándo.",
            "¿Sabés qué pasa, querido? Como te ven, te tratan. Si te ven mal, te maltratan; y si te ven bien, te contratan. Esto sirve para las damas y para la vida.",
            "María Eugenia de China es muy linda, sí. Pero que no se haga la distraída: yo sé perfectamente de dónde salió cada uno de sus maridos.",
            "Me dijeron que Carlosaúlmagno me invita a conocer Anillaco. Qué hombre encantador... y tan simpático. Yo todavía no fui, pero todo se puede conversar.",
            "La otra noche pensé en invitar a Godofredo a mi mesa. Después me acordé de que trabaja tanto que probablemente estaría construyendo otra pared mientras yo almuerzo.",
            "Una vez invité a Empecid Campeador a comer. Abrí todas las ventanas del castillo. Todas.",
            "No entiendo por qué algunos dicen que soy demasiado vieja. Querido, yo he visto cambiar las modas, los reinos y hasta los muebles de este castillo.",
            "¿Lo dije o lo pensé? Bueno... mejor lo pienso. No quiero generar un conflicto diplomático en la mesa.",
            "Este programa... digo, esta partida trae suerte. Aunque no necesariamente para el invitado.",
            "Me gusta la gente joven, querido. Tienen energía, entusiasmo... y todavía creen que pueden ganarme."
        ],

        INICIO_PARTIDA: [
            "¡Ta-ble-ra-zo! Bueno, querido, sentate cómodo. Esta es mi mesa y este es mi tablero de mi confianza.",
            "assets/bots/myrthlagrandecortina.mp3",
            "Bienvenido a mi mesa, querido. Te acepté el reto de jugar a las damas, pero acá las reglas son claras: se juega con elegancia.",
            "¡Qué lindo recibirte! Sentate, querido. Los chicos ya están mirando y yo estoy lista. ¡Que empiece la partida!",
            "Bueno, querido, empezamos. Espero que hayas venido preparado, porque yo no invito a cualquiera a jugar en mi mesa.",
            "¡Ta-ble-ra-zo! Y te voy a decir una cosa antes de empezar: como te ven, te tratan. Así que jugá bien.",
            "Bienvenido, querido. Esta mesa ha visto pasar a reyes, reinas, caballeros y personajes de toda clase. Ahora te toca a vos."
        ]

    },

    // ---- Nivel 8: Godofredo ----

    godofredo: {

        VICTORIA: [
            "¡Victoria, mi señor! ¡Por las barbas de mi abuelo, parece que el entrenamiento con la espada no fue en vano!",
            "¡He vencido, mi señor Otto! ¡Qué honor combatir en este castillo que yo mismo ayudé a levantar!",
            "¡Victoria! No soy hombre de presumir, mi señor, pero hoy las damas me han tratado con justicia.",
            "¡Por Dios y por todos los santos! ¡He ganado! Mi señor Otto podrá estar orgulloso de su humilde peón.",
            "¡He aquí el fruto del trabajo, mi señor! Quien pone empeño en su oficio acaba por recoger buenos frutos.",
            "¡Victoria! Tal vez no tenga sangre noble, pero hoy he combatido con honra y eso me basta.",
            "¡Ganamos, mi señor! Y si algún noble del castillo desea probar mi acero, que haga fila después de terminar la partida.",
            "¡Ah, qué alegría! ¡He demostrado que un peón también puede vencer a los grandes señores!"
        ],

        DERROTA: [
            "¡Ouwê! He sido derrotado, mi señor. Mas no os preocupéis: volveré a entrenar y regresaré más fuerte.",
            "Habéis jugado mejor que yo, mi señor. Acepto la derrota con honra y os felicito por vuestra victoria.",
            "¡Por las barbas de mi abuelo! Esta vez las damas me han sido adversas. Habrá revancha, si vos lo permitís.",
            "He perdido, mi señor. Quizá deba volver a la pala y al martillo hasta recuperar la buena fortuna.",
            "¡Wâfâ! No salió como esperaba. Mas un hombre trabajador no abandona su labor por un solo fracaso.",
            "Mi señor, habéis demostrado ser un adversario digno. Guardaré memoria de esta derrota y aprenderé de ella.",
            "¡Donnerwetter! Me habéis vencido limpiamente. No hay vergüenza en caer ante un rival que ha combatido mejor.",
            "Perdí esta vez, mi señor, pero todavía me quedan fuerzas para otro duelo. Un peón puede caer y volver a levantarse."
        ],

        EMPATE: [
            "¡Tablas, mi señor! Un resultado justo entre dos combatientes que han dado cuanto tenían.",
            "Empate, mi señor. No es victoria, pero tampoco derrota. A veces el trabajo bien hecho termina así.",
            "¡Ahâ! Parece que ninguno de los dos ha logrado doblegar al otro. Os felicito, mi señor.",
            "Un honorable empate. Ha sido un placer medir mis fuerzas con vos, mi señor.",
            "¡Por Dios! Tanto esfuerzo para terminar en tablas... Mas así son los duelos, y hay que aceptar el resultado.",
            "Habéis resistido muy bien, mi señor. Será menester que volvamos a enfrentarnos en otra ocasión.",
            "Tablas. Quizá ninguno de los dos merecía perder este combate.",
            "Mi señor, si todas las batallas fueran tan limpias como ésta, habría mucha menos sangre en los caminos."
        ],

        CORONACION_SUFRIDA: [
            "¡Ouwê! ¡Una de vuestras fichas ha alcanzado la última línea! Tendré que redoblar mis esfuerzos, mi señor.",
            "¡Por las barbas de mi abuelo! Esa ficha ha ascendido de rango. Ahora el combate será mucho más difícil.",
            "¡Halt! No puedo permitir que esa nueva dama haga estragos entre mis filas.",
            "Una nueva dama en vuestro ejército... Esto comienza a ponerse serio, mi señor.",
            "¡Donnerwetter! Esa ficha ha llegado demasiado lejos. Mi defensa tendrá que trabajar como nunca.",
            "He permitido que una de vuestras fichas alcance la gloria, y ahora debo pagar por mi descuido.",
            "¡Wâfen! ¡A las armas! Esa nueva dama puede causar grandes daños si no la detenemos.",
            "Mi señor, habéis conseguido una poderosa pieza. Pero todavía no habéis ganado la batalla."
        ],

        CORONACION_PROPIA: [
            "¡Victoria! ¡Una de mis fichas ha alcanzado la última línea y se ha convertido en dama! ¡Qué honor!",
            "¡Por Dios! ¡He coronado una dama! Mi entrenamiento comienza a dar sus frutos.",
            "¡Ahâ! Una ficha humilde ha ascendido. Como un peón que después de años de trabajo alcanza una posición honorable.",
            "¡Donnerwetter! ¡Una nueva dama en mis filas! Ahora sí que el combate se vuelve interesante.",
            "¡He aquí una recompensa al esfuerzo, mi señor! Una de mis fichas ha llegado hasta el final del camino.",
            "¡Una dama! Mi señor Otto estaría orgulloso de ver cómo se desempeñan mis tropas en su castillo.",
            "¡Por las barbas de mi abuelo! Esa ficha ha recorrido más terreno que yo cargando piedras para levantar estos muros.",
            "¡Magnífico! Una nueva dama se une a mis filas. Ahora veremos si puede ganarse su lugar en el campo de batalla."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Wâfâ! ¡Me estáis arrebatando mis hombres a manos llenas, mi señor! Tendré que reorganizar mis filas.",
            "¡Donnerwetter! ¡Mis fichas están cayendo una tras otra! No esperaba semejante golpe.",
            "¡Por las barbas de mi abuelo! Habéis abierto una brecha terrible en mi defensa.",
            "Mi señor, estáis causando estragos entre mis filas. Tendré que ser mucho más cuidadoso.",
            "¡Harm! Ese golpe ha sido duro. Pero mientras quede una ficha en pie, seguiré combatiendo.",
            "¡Wâfen! ¡No puedo permitir que sigáis avanzando de ese modo! Aún queda batalla por librar.",
            "Me estáis comiendo muchas fichas, mi señor, casi como Rechinante se comió la mitad del trigo que había segado la semana pasada.",
            "¡Ouwê! Mis hombres han sufrido una gran pérdida. Mas todavía no ha llegado el momento de rendirse."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Ahâ! ¡He abierto una brecha en vuestras filas! Por las barbas de mi abuelo, eso sí que ha sido un buen golpe.",
            "¡Donnerwetter! ¡Mis hombres han avanzado como una verdadera hueste y han dejado vuestro ejército muy mermado!",
            "¡Victoria para mis filas! He logrado derribar varias posiciones enemigas de una sola acometida.",
            "¡Por Dios! ¡Cuántas fichas han caído ante mis hombres! Mi entrenamiento está dando resultado.",
            "¡Magnífico! Hoy mis tropas han combatido con la fuerza de los hombres que levantaron estos muros.",
            "¡Ahâ! Una buena jornada de combate. He limpiado vuestro camino de obstáculos, mi señor.",
            "¡Por las barbas de mi abuelo! Si hubiera construido el castillo con la misma facilidad con la que acabo de capturar esas fichas, habría terminado en la mitad de tiempo.",
            "¡Mis filas avanzan con firmeza! Parece que la pala y el martillo me enseñaron más estrategia de lo que yo creía."
        ],

        TODO_DAMAS: [
            "¡Ahâ! Ya no quedan peones entre nosotros, mi señor. Sólo damas en el campo de batalla.",
            "¡Por Dios! ¡Todas las fichas humildes han desaparecido y sólo quedan damas! Parece un duelo entre grandes señoras.",
            "¡Donnerwetter! El tablero se ha convertido en un campo de batalla de damas. Habrá que combatir con mucho cuidado.",
            "Sólo quedan damas, mi señor. Ahora cada movimiento puede decidir el destino del combate.",
            "¡Qué curioso destino! Comenzamos con humildes peones y ahora sólo quedan damas luchando por la victoria.",
            "Ya no hay trabajadores en el campo, mi señor. Sólo las grandes señoras han sobrevivido al combate.",
            "¡Por las barbas de mi abuelo! Si todos los combates terminaran así, tendría que construir un castillo entero para albergar tantas damas.",
            "El tablero está despejado de peones. Ahora veremos quién de nosotros sabe mandar mejor a sus damas."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Esto está complicado, mi señor. Mas una vez logré sacar a Neanderthalius de un glaciar, y si pude hacer eso, todavía puedo salir de ésta.",
            "¡Ouwê! Quedan pocas fuerzas en mis filas, pero mientras quede un hombre en pie, no abandonaré el combate.",
            "Mi señor, la situación es mala. Pero he trabajado en condiciones peores y siempre he encontrado una manera de terminar la tarea.",
            "¡Donnerwetter! Ya casi no quedan hombres bajo mi mando. Tendré que hacer que cada uno de ellos valga por diez.",
            "La batalla se ha puesto muy cuesta arriba, mi señor. Aun así, no pienso entregar las armas.",
            "¡Wâfen! Mis filas están muy reducidas, pero todavía puedo daros un buen susto antes del final.",
            "He visto caer muros y he levantado otros desde sus cimientos. Esto tampoco será fácil, pero tampoco es imposible.",
            "Mi señor, esto está tan complicado como cuando encontré a Neanderthalius congelado en el hielo. Y mirad: al final lo saqué de allí."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Ouwê! Me estáis dominando con claridad, mi señor. Tendré que trabajar mucho para darle la vuelta a este combate.",
            "¡Donnerwetter! Vuestro ejército avanza con demasiada fuerza. Pero aún no he arriado mi estandarte.",
            "Mi señor, he de reconocerlo: estáis jugando mejor que yo. Mas todavía queda camino por recorrer.",
            "¡Por las barbas de mi abuelo! Mis filas están siendo superadas. Tendré que pensar cada movimiento como si colocara una piedra fundamental.",
            "Esto no marcha bien, mi señor. Pero he construido este castillo piedra por piedra; también puedo reconstruir mi partida movimiento por movimiento.",
            "¡Harm! El combate se me está poniendo cuesta arriba. Aun así, un hombre de trabajo no abandona una obra a medio terminar.",
            "Parece que vuestro ejército ha tomado ventaja. ¡Mas no cantéis victoria todavía, mi señor!",
            "¡Wâfen! ¡No permitiré que me derribéis tan fácilmente! Todavía tengo fuerzas para cambiar el curso de la batalla."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Ahâ! Mis filas están dominando el combate, mi señor. Hoy parece que el entrenamiento ha dado sus frutos.",
            "¡Por Dios! Vuestro ejército está retrocediendo. Si mi señor Otto pudiera verme ahora, estaría orgulloso.",
            "¡Donnerwetter! ¡Estoy llevando ventaja y no pienso desperdiciarla!",
            "Mi señor, parece que hoy mis hombres trabajan mejor que los vuestros. Tal vez sea hora de que vos toméis algunas lecciones de un humilde peón.",
            "¡Por las barbas de mi abuelo! Estoy dominando el campo de batalla. Hasta Monsieur Fisure Termidor podría pensar que estoy jugando después de beberme un buen vino.",
            "Mis tropas avanzan con firmeza, mi señor. Como cuando levantamos los muros de este castillo: piedra sobre piedra, sin detenernos.",
            "¡Ahâ! Parece que conocer este tablero casi tan bien como conozco sus piedras me está dando ventaja.",
            "¡Mi señor Otto estaría orgulloso! Un humilde peón está dominando el campo de batalla que él me confió."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Ahora estamos en terreno peligroso, mi señor. Un solo error puede echar abajo todo el trabajo.",
            "¡Ouwê! Quedan pocas fuerzas para ambos bandos. Ahora cada movimiento debe hacerse con mucho cuidado.",
            "¡Donnerwetter! El combate está tan parejo que hasta una piedra mal colocada podría cambiar el destino de la batalla.",
            "Mi señor, hemos llegado al momento en que un hombre prudente piensa antes de levantar el martillo.",
            "Quedan pocas fichas y ninguna ventaja clara. Ahora veremos quién conserva mejor la cabeza fría.",
            "¡Por Dios! Estamos sobre la cornisa. Un error y uno de los dos caerá al vacío.",
            "Así como un muro puede caer por una sola piedra mal puesta, una partida puede perderse por un solo movimiento.",
            "Mi señor, ya no hay lugar para la imprudencia. Aquí se gana con paciencia y trabajo."
        ],

        PARTIDO_LARGO: [
            "¡Donnerwetter! ¡Este combate lleva más tiempo que la construcción de algunas de las torres del castillo!",
            "Mi señor, llevamos tanto tiempo jugando que empiezo a extrañar la pala y el martillo.",
            "¡Ouwê! ¿Cuánto tiempo llevamos en esto? Hasta Godofredo empieza a necesitar un descanso.",
            "¡Por las barbas de mi abuelo! He construido muros más deprisa de lo que estamos terminando esta partida.",
            "Mi señor, si seguimos así, tendremos que llamar a Fray Marolio para que nos traiga comida.",
            "Este combate parece no tener fin. Espero que Monsieur Fisure Termidor no haya terminado ya todo el vino mientras nosotros seguimos aquí.",
            "¡Halt! Un momento de descanso no vendría mal. Hasta los hombres más fuertes necesitan sentarse después de tanto tiempo.",
            "¡Donnerwetter! Si esta partida dura mucho más, mi señor Otto tendrá que agregar una sala nueva al castillo sólo para guardar nuestras fichas."
        ],

        INICIO_HOSTILIDADES: [
            "¡Ahâ! ¡Ahora sí comienza el verdadero combate, mi señor!",
            "¡Por las barbas de mi abuelo! ¡La primera sangre ha sido derramada! Que cada hombre se prepare para la batalla.",
            "¡Donnerwetter! Ya no estamos practicando. Ahora estamos combatiendo de verdad.",
            "¡Wâfen! ¡A las armas, mi señor! La batalla ha comenzado.",
            "¡Por Dios! Una primera ficha ha caído. Ahora veremos quién de nosotros tiene mejor temple.",
            "¡Halt! ¡Se acabaron las cortesías! Ahora cada movimiento tendrá sus consecuencias.",
            "Mi señor, la primera ficha ha sido tomada. Como en cualquier obra, ahora comienza la parte difícil.",
            "¡Ahâ! Ya se ha escuchado el primer golpe. Que gane el más hábil y que el combate sea honorable."
        ],

        COMENTARIO_ALEATORIO: [
            "Mi señor Otto me pidió que levantara estos muros y lo hice. Si me pide que luche, también cumpliré con mi deber.",
            "A veces extraño mi aldea en la Selva Negra. Allí no había damas ni grandes señores, pero sí mucho trabajo.",
            "He trabajado con la pala desde que era niño. Nunca pensé que algún día tendría una espada en la mano.",
            "Mi señor Otto me dio el honor de combatir aquí. No pienso desperdiciar la confianza que depositó en mí.",
            "Dicen que soy sólo un peón. Puede ser. Pero hasta el castillo más grande comienza con un trabajador que coloca la primera piedra.",
            "La semana pasada tuve que reparar una pared porque alguien se apoyó sobre ella con demasiada fuerza. No diré quién fue, pero Monsieur Fisure Termidor estaba cerca.",
            "Icardio volvió a tocar la mandolina anoche. ¡Por Dios! Uno puede soportar un día entero de trabajo, pero no una serenata a las tres de la madrugada.",
            "Fray Marolio es un buen hombre, aunque si algún día me invita a comer espero que haya algo más que arroz y lentejas.",
            "Neanderthalius me cae bien. No hace demasiadas preguntas y nunca se queja cuando le pido que ayude a mover piedras.",
            "Yo fui quien sacó a Neanderthalius del hielo. Pensé que iba a morir allí, pero resultó ser más resistente de lo que parecía.",
            "Leonor de Aquitapia me pidió que formara parte de su séquito para secarle la nuca. Al día siguiente quería invitarme a un asado a solas. No termino de comprender a esa mujer.",
            "Myrth la Grande merece mi respeto por sus muchos años. Aunque, siendo sincero, prefiero jugar las damas con mi señor Otto que sentarme a su mesa.",
            "La princesa María Eugenia me mandó ayer a recoger flores para su alcoba. A veces pienso que en este castillo hay demasiados nobles y muy pocos trabajadores.",
            "Carlosaúlmagno es un hombre simpático, pero no sé si confiaría en él. Me ofreció una fortuna para ir a trabajar a Anillaco. Algo no me termina de convencer.",
            "Empecid Campeador pasó esta mañana junto al taller. Rechinante se comió parte del trigo que habíamos almacenado y el buen caballero aseguró que fue culpa de los moros.",
            "Monsieur Fisure Termidor dice que trabaja mejor después de beber. Yo trabajo mejor después de dormir ocho horas. Cada hombre tiene sus métodos.",
            "A veces pienso que los nobles gastan más dinero en cosas innecesarias de lo que mi señor Otto gasta en pagarme. Y eso ya es decir bastante.",
            "He levantado muros, reparado tejados y cavado zanjas. Nunca imaginé que alguna de mis herramientas sería reemplazada por una espada.",
            "Un buen trabajo requiere paciencia. Primero se mide, luego se corta y después se coloca. En las damas debe ser parecido, aunque aquí las piedras se mueven solas.",
            "Por las barbas de mi abuelo, todavía recuerdo cuando puse la primera piedra de este castillo. Ahora veo a toda esta gente jugando dentro de él. Es un gran orgullo para mí.",
            "No soy hombre de grandes riquezas ni de alta cuna. Pero sé trabajar, sé mantener mi palabra y sé quién es mi señor.",
            "Hoy vi a Icardio cortejando a una doncella en el patio. Si dedicara a trabajar la mitad del esfuerzo que dedica a las serenatas, levantaría una torre él solo.",
            "Neanderthalius todavía intenta encender fuego golpeando piedras. No quise decirle que hay formas más sencillas. Parecía muy orgulloso.",
            "Fray Marolio me prometió una comida especial. Cuando llegué había arroz, lentejas y sardinas. Supongo que eso cuenta como especial.",
            "El castillo podrá ser de piedra, pero lo importante son las personas que lo mantienen en pie. Aunque algunos de ellos den más trabajo del que merecen.",
            "A veces me pregunto si un peón como yo puede llegar muy lejos. Luego recuerdo que construí un castillo y pienso que quizá no haya límites.",
            "Mi señor Otto es algo ahorrativo con el dinero, eso es cierto. Pero jamás olvidaré que me dio la oportunidad de luchar en este lugar.",
            "No entiendo cómo Leonor de Aquitapia puede organizar un torneo, preparar un asado y secarse la nuca al mismo tiempo. Es una habilidad que jamás aprendí.",
            "Dicen que Carlosaúlmagno tiene un gran reino en Anillaco. Yo sólo espero que allí paguen mejor que aquí.",
            "Si algún día termino mis obligaciones y puedo descansar una tarde entera, quizá vuelva a tomar la pala por gusto. Uno se acostumbra al trabajo.",
            "Por las barbas de mi abuelo, a veces pienso que los caballeros se complican demasiado. Una buena pala resuelve muchos problemas."
        ],

        INICIO_PARTIDA: [
            "¡Ahâ! ¡Así que éste es el duelo! Mi señor Otto, será un honor combatir ante vos.",
            "Por las barbas de mi abuelo, qué extraño se siente empuñar una espada después de tantos años con la pala. ¡Comencemos, mi señor!",
            "Mi señor, he dejado la pala y el martillo a un lado y he venido a combatir. Haré cuanto esté en mi mano para honrar vuestro castillo.",
            "¡Donnerwetter! Jamás pensé que el peón que levantó estos muros terminaría luchando sobre ellos. ¡Comencemos!",
            "Mi señor Otto, conozco estas piedras mejor que nadie. Quizá ese conocimiento me dé alguna ventaja en este combate.",
            "¡Por Dios! He trabajado para levantar este castillo y ahora tengo el honor de defender mi nombre dentro de él. ¡Que comience el duelo!",
            "Mi señor, no tengo sangre noble ni grandes títulos, pero sí tengo brazos fuertes, buena voluntad y muchas horas de entrenamiento.",
            "¡Hê! ¡Todos listos! He dejado mis herramientas en el taller y ahora toca demostrar lo aprendido en el campo de batalla.",
            "Mi señor Otto, cuando construimos este patio jamás imaginé que algún día estaría aquí con una espada en la mano. ¡Será un honor enfrentaros!",
            "¡Por las barbas de mi abuelo! Si el castillo que construí puede resistir mis golpes de martillo, espero que vuestras fichas puedan resistir mis movimientos."
        ]

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
