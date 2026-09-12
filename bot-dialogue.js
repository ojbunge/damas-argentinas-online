// ============================================================
//  BOT-DIALOGUE.JS — lo que dice (o suena) cada personaje
// ============================================================
// Diccionario de DOS niveles de idioma primero (es / en), y adentro de
// cada uno: botId -> código de evento -> lista de frases. Cuando el
// motor de bots.js (ver detectCommentaryEvent) detecta un evento,
// pickBotDialogueLine(botId, eventCode) busca la lista correspondiente
// DENTRO DEL IDIOMA ACTUAL (la variable global currentLang, definida en
// index.html) y elige UNA frase al azar entre las que haya, con la
// misma probabilidad para cada una — no importa si hay 1, 3 o 10
// frases cargadas.
//
// Las frases en español y en inglés son traducciones fieles unas de
// otras, en el mismo orden -- pero cada elección al azar es
// independiente por idioma, así que no hace falta (ni tiene sentido)
// que el índice elegido coincida entre ambos: cada jugador ve una
// frase traducida al azar en SU propio idioma, nada más.
//
// Los nombres propios de los personajes (Neanderthalius, Leonor de
// Aquitapia, Carlosaúlmagno, etc.) NUNCA se traducen -- son los mismos
// en los dos idiomas, tal como pidió Otto.
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
// vacío) cualquier evento que todavía no tenga frase -- si la lista
// está vacía, o directamente no existe la entrada para ese bot, no se
// muestra nada (no revienta ni tira error, simplemente ese evento pasa
// en silencio para ese personaje esa vez). Eso sí: si agregás una
// frase nueva del lado español, acordate de agregar su traducción del
// lado inglés (o viceversa) para que ambos idiomas sigan
// paralelos -- si no, ese idioma le va a mostrar menos variedad al
// jugador para ese evento puntual, aunque nada se rompa.
//
// Cada frase va entre comillas, y las frases se separan con coma —
// las comas que uses DENTRO de una frase (";eso, che, no importa!")
// no rompen nada, porque quedan protegidas adentro de las comillas;
// lo que separa una frase de la siguiente es la coma que está POR
// FUERA de las comillas, en la lista.
//


const BOT_DIALOGUE = {
    es: {

    // ---- Nivel 1: Neanderthalius ----
    neanderthalius: {
        VICTORIA: [
            "¡UGH! ¡Neanderthalius ganó! Neanderthalius mejor de todos.",
            "Neanderthalius gana. Otro pierde. Así es vida.",
            "¡Neanderthalius fuerte! Otro débil. ¡Ugh!",
            "Nadie poder con Neanderthalius. Ni siquiera Caballero Chiquito con sus trampas."
        ],
        DERROTA: [
            "Uh... Neanderthalius perdió. Otro bueno con fichas.",
            "Neanderthalius triste. Pero Neanderthalius jugará de nuevo.",
            "Neanderthalius confundido. Fichas moverse solas, parecer magia de Hombre de la Cruz.",
            "Neanderthalius perder. Muy triste. Neanderthalius ir más tarde con Señor del Vino para hacer chistes y beber, así Neanderthalius estar contento otra vez."
        ],
        EMPATE: [
            "Nadie gana, nadie pierde. Neanderthalius... confundido, pero bien.",
            "Empate está bien. Neanderthalius no enojado.",
            "Tablero vacío. Empate. Como cuando Neanderthalius comer toda la comida y no quedar nada para Hombre de la Cruz.",
            "Empate estar bien. Neanderthalius empatar una vez con Señor de la Música, ahora empatar con otro. Dos empates. Neanderthalius jugador muy fuerte."
        ],
        CORONACION_SUFRIDA: [
            "Uh... eso no bueno para Neanderthalius.",
            "Ficha grande de otro. Neanderthalius no gusta.",
            "¡Ugh! Ficha de otro llegar al fondo. Ahora ser reina poderosa, como Reina del Asado con su tenedor.",
            "Ahora otro tener ficha grande. ¡Cuidado! Pega fuerte como mascota de Señora de la Mesa."
        ],
        CORONACION_PROPIA: [
            "¡UGH! ¡Ficha de Neanderthalius ahora GRANDE!",
            "Neanderthalius tiene ficha poderosa. ¡Uh-uh!",
            "¡Ficha llegar al final! Ahora ser reina. ¡Mucha honra!",
            "Ficha grande. Fuerte. Como corcel de Hombre de Pelo Amarillo."
        ],
        CAPTURA_MULTIPLE_SUFRIDA: [
            "Auu... muchas fichas se fueron. Neanderthalius triste.",
            "Eso... eso dolió. Varias de una vez.",
            "¡Ugh! Otro comer fichas de Neanderthalius. ¡Igual que Neanderthalius comer pata de pollo!",
            "Muchas fichas menos. Neanderthalius pensar... ¿Quizás Caballero Chiquito mover fichas de otro?"
        ],
        CAPTURA_MULTIPLE_PROPIA: [
            "¡UNA, DOS, TRES! ¡Neanderthalius come mucho!",
            "¡Ugh-ugh-ugh! Neanderthalius fuerte hoy.",
            "¡Ñam, ñam, ñam! Muchas fichas de otro afuera.",
            "¡Neanderthalius comer mucho! Como cuando Neanderthalius agarrar carne de la parrilla de Reina del Asado y correr."
        ],
        TODO_DAMAS: [
            "Ya no hay fichas chiquitas. Solo grandes. Raro.",
            "Tablero lleno de fichas grandes ahora. Neanderthalius confundido.",
            "Solo haber fichas grandes ahora. Señor de la Música ser muy bueno con las fichas grandes. Él decirles reinas. Él ser muy inteligente y bueno con las reinas.",
            "Muchas damas. Como mujeres en castillo. Princesa muy Linda, Reina del Asado y Señora de la Mesa. ¡Ugh! Muchas."
        ],
        POCAS_FICHAS_EN_DESVENTAJA: [
            "Neanderthalius tiene poquitas. Neanderthalius nervioso.",
            "Esto... esto no va bien para Neanderthalius.",
            "Fichas casi no haber. Neanderthalius asustado. ¿Hombre de la Cruz dar comida si Neanderthalius no tener fichas?",
            "Quedar poquitas. Necesitar ayuda de Hombre de Pelo Amarillo para romper hielo y escapar."
        ],
        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Otro tiene muchas más. Neanderthalius no entiende cómo.",
            "Uh-oh. Otro ganando mucho.",
            "¡Ugh, ugh! Otro comer mucho, igual que Reina del Asado.",
            "Otro tener muchas fichas. Quizás usar magia de Señor de la Música para mover rápido."
        ],
        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Neanderthalius tiene MUCHAS fichas! ¡Uh!",
            "Neanderthalius ganando mucho. Neanderthalius contento.",
            "¡Mucho, mucho comer! Otro sin fichas.",
            "Neanderthalius dominar tablero. Como Neanderthalius dominar cueva cuando encontrar oso."
        ],
        PARIDAD_POCAS_FICHAS: [
            "Pocas fichas para los dos ahora. Neanderthalius atento.",
            "Casi terminando. Pocas fichas quedan.",
            "Pocas fichas. Mover despacito. Como si Caballero Chiquito estuviera cerca.",
            "Silencio en tablero. Solo pocas fichas. Raro."
        ],
        PARTIDO_LARGO: [
            "Esto lleva mucho tiempo. Neanderthalius cansado.",
            "Partido largo. Sol ya se movió mucho en el cielo.",
            "¡Uo! ¡Uo! Partido muy largo. Neanderthalius querer ir a caverna de Hombre de la Cruz. Si no está Hombre, Neanderthalius poder comer mucha comida!",
            "Uh, uh! ¡Partido muy largo! Pero no tan largo como tiempo que estar Neanderthalius en hielo. Por suerte Hombre de Pelo Amarillo ver a Neanderthalius, romper el hielo y traerlo al castillo."
        ],
        INICIO_HOSTILIDADES: [
            "¡Ahora sí! ¡Ya empezó pelea de fichas!",
            "Uh-uh, ya no hay más espera. Ahora en serio.",
            "¡Mover ficha! Pelea empieza.",
            "Neanderthalius golpear piedra con piedra. ¡PUM! Juego empezar."
        ],
        COMENTARIO_ALEATORIO: [
            "Neanderthalius le gusta esta piedra plana con cuadraditos.",
            "¿Otro también piensa mucho para mover ficha?",
            "Neanderthalius tiene hambre. Pero primero, ficha.",
            "Señor del Vino ser muy divertido. Él dar vino a Neanderthalius, y Neanderthalius ponerse contento y reir.",
            "Otro día Neanderthalius perseguir conejo por el campo, por el olfato. De golpe aparecer a lo lejos Señor del Olor. Neanderthalius perder rastro de conejo, olor a pata del Señor tapar todo!",
            "Antes de quedar atrapado en hielo, Neanderthalius ver una señora. Ella no ser tan vieja entonces. Ahora misma señora estar sentada en mesa adentro del castillo.",
            "¡Ugh! Hombres con ojos estirados de Princesa muy Linda dar miedo. Mejor mirar de lejos.",
            "Caballero Chiquito parecer buena gente, pero mueve fichas muy rápido. Hacer trampa, seguro."
        ],
        INICIO_PARTIDA: [
            "Neanderthalius listo. Neanderthalius siempre listo.",
            "¡Uh! Juego empieza. Neanderthalius contento.",
            "Neanderthalius jugar damas. ¿Por qué? No saber. Pero jugar.",
            "¿Otro dar pata de pollo si Neanderthalius gana?"
        ]
    },

    // ---- Nivel 2: Monsieur Fisure Termidor ----
    termidor: {

        VICTORIA: [
            "¡Voilà! ¡La nobleza francesa vuelve a demostrar su superioridad! ¡Y el Termidor, por supuesto!",
            "¡Magnifique, mon ami! ¡Te he derrotado! Glup... sabía perfectamente lo que estaba haciendo.",
            "¡Victoria! ¡Sabía que esta partida estaba bajo mi control desde el principio! Bueno... casi desde el principio.",
            "¡Ha sido un honor aplastarte, mon ami! Ahora permíteme celebrar como corresponde: ¡Termidor para todos!",
            "¡Sacre bleu! ¡Qué paliza te he dado! Pero no te preocupes, hasta el mismísimo Carlosaúlmagno perdería alguna vez... aunque claro, él juega mucho mejor con unas copas encima.",
            "¡Ganó Francia! ¡Y pensar que algunos prefieren el agua o el vino de Burdeos! ¡Salud, mon ami, a tu salud!",
            "assets/bots/termidor2.mp3"
        ],

        DERROTA: [
            "Ah... me has derrotado. Bueno, mon ami, mientras quede Termidor en la caja, hay cosas peores.",
            "¡Me estás cagando a palos! Pero no importa... el próximo Tetra Brik seguramente me devuelva mi talento.",
            "He perdido... ¡hic! Pero no es grave. Grave sería que se acabara el Termidor.",
            "Bueno, he sido derrotado. Mi honor ha sufrido un duro golpe... pero mi copa sigue llena, y eso es lo importante.",
            "¡Sacre bleu! ¡Me has vencido! Felicitaciones, mon ami. Ésto me pone triste... pero no tan triste como la vida de Godofredo. Ese buen hombre nunca me ha aceptado una invitación a beber ¡A tu salud, mi vencedor!",
            "¡Mon Dieu! ¡Me has ganado limpiamente! Quizás el Termidor de hoy estaba un poco picado... ¡hic! O quizás simplemente jugaste mejor. ¡Salud!"
        ],

        EMPATE: [
            "¡Un empate! Ni vencedor ni vencido, mon ami. Una partida digna de dos grandes caballeros... glup.",
            "¡Hemos quedado iguales! Magnifique. Aunque debo admitir que el Termidor me tenía preparado para la victoria.",
            "Empate honorable, mon ami. La próxima vez beberé un poco más y entonces veremos quién manda aquí.",
            "¡Un empate! Brindo por ello. Bueno... en realidad brindo por cualquier cosa.",
            "¡Hic! ¡Tablas! Empate, como podríamos ser Leonor de Aquitapia y yo si ella me dijera que sí ¡Combinamos tan bien como el asado y el vino!",
            "Bueno, mon ami, un empate es como un vino joven: ni muy dulce ni muy fuerte. ¡Acepto el resultado!"
        ],

        CORONACION_SUFRIDA: [
            "¡Sacré bleu! ¡Ha conseguido una dama! Bueno, bueno... no pasa nada. Esto todavía se puede remontar.",
            "¡Mon Dieu! Esa ficha grande me ha complicado la existencia. Pero todavía tengo Termidor.",
            "¡Una dama! ¡Qué insolencia! Hic... Tendré que ponerme serio ahora. Or tomar otra copa.",
            "Ah, has coronado. Muy bien, mon ami... disfrutá de tu pequeño triunfo mientras puedas.",
            "¡Una reina, mon ami! ¡Como Myrth La Grande! Hace poco esa señora me invitó a almorzar a su mesa... ¡hic!... pero se le acabó el vino y no tuve más opción que tomarme su alcohol medicinal.",
            "¿Una dama? ¡Sacre bleu! ¡Me recuerdas a Icardio de Milán! Él siempre va detrás de las damas... y de los buenos vinos, ¡pobre iluso que no conoce el Termidor!"
        ],

        CORONACION_PROPIA: [
            "¡Voilà! ¡Una dama para Monsieur Termidor! ¡El vino me está haciendo jugar como un maestro!",
            "¡Magnifique! ¡Ficha grande! Sabía que el Termidor tenía un plan.",
            "¡He coronado, mon ami! ¡Esto es lo que ocurre cuando uno juega ligeramente entonado!",
            "¡Una dama! ¡Hic! ¡Ahora sí que se acabó la cortesía!",
            "¡Oh la la! ¡Ya tengo una reina! Ahora sí que me siento como un verdadero rey de Francia. ¡Glup!",
            "¡Ficha grande! ¡Salud, mon ami! ¡Esta victoria (parcial) se la dedico a mi buen amigo Carlosaúlmagno, el rey de los lujos! ¡Hic!"
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Oh là là! ¡Me has llevado varias fichas de una sola vez! Bueno... todavía queda vino.",
            "¡Mon Dieu, qué masacre! ¡Me has comido varias fichas! Esto no estaba en mis cálculos... aunque mis cálculos están un poquito borrosos.",
            "¡Eso ha sido una carnicería, mon ami! Pero tranquilo, que el Termidor todavía corre por mis venas.",
            "¡Hic! ¡Me has hecho puré unas cuantas fichas! Bueno, bueno... ya vendrá mi revancha.",
            "¡Ay, mis fichas! ¡Me has dejado el tablero más vacío que la bodega de un abstemio! ¡Glup!",
            "¡Oh la la! ¡He perdido muchas fichas! Aunque eso no será nada comparado con lo que perderé si cedo a los encantos de la princesa María Eugenia. Ella se quiere quedar con mis castillos en el Loira y ya ni podré pagar el Termidor ¡Eso sí que sería perder!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡UNE, DEUX, TROIS! ¡Voilà! ¡El Termidor me está haciendo jugar como un campeón!",
            "¡Magnifique! ¡Me he comido varias de tus fichas de una sola vez! ¡Glup!",
            "¡Eso ha sido una captura digna de mi linaje! Bueno... o del Termidor.",
            "¡Ja! ¡Te he barrido varias fichas, mon ami! ¡Y todavía estoy jugando con una sola copa de ventaja!",
            "¡Tantas fichas juntas! ¡Glup! ¡Esto es mejor que encontrar una caja de Termidor sellada en la despensa de Fray Marolio!",
            "¡Zas, zas, zas! ¡Te he comido unas cuantas, mon ami! ¡El espíritu de batalla de Empecid Campeador ha poseído mi brazo... pero mi espíritu etílico sigue siendo 100% francés!"
        ],

        TODO_DAMAS: [
            "¡Oh là là! ¡Ahora sólo quedan damas! Esto ya parece una reunión de la corte.",
            "¡Todas fichas grandes! Magnifique. Ahora sí que empieza la verdadera fiesta.",
            "¡Sólo quedan damas, mon ami! Esto se ha puesto mucho más interesante... y mucho más elegante.",
            "¡Hic! ¡Puras damas! Espero que sean más fáciles de manejar que las de la corte francesa.",
            "¡Sólo hay damas en nuestra fiesta, monsieur! Glup, glup... Cómo se deleitaría mi amigo Icardio de Milán en esta situación. Aunque su buen gusto en mujeres no se refleja en su gusto en vinos ¡Prefiere un cabernet de Bordeaux a una caja de Termidor!",
            "¡Puras reinas! ¡Salud, mon ami! ¡Esto parece la mesa de Myrth la Grande, pero con mucho más estilo y, por supuesto, mucho más vino! ¡Hic!"
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Esto se está poniendo feo, mon ami... me quedan pocas fichas y muchas ganas de beber.",
            "¡Oh là là! ¡Estamos en las diez de última! Pero todavía puedo remontar. Creo.",
            "Me quedan muy pocas fichas... pero mientras quede Termidor, queda esperanza.",
            "La situación es delicada, sí... pero jamás subestimes a un noble francés ligeramente entonado.",
            "¡Hic! ¡Casi no me quedan fichas! Estoy más seco que... bueno, más seco que el paladar de Neanderthalius después de una noche conmigo. ¡Glup!",
            "¡Mon Dieu! ¡Me estás acorralando! Necesito otro Termidor... ¡hic! ...para pensar una estrategia de retirada. O de contraataque, ¡quién sabe!"
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Mon Dieu! ¡Me llevas mucha ventaja! Esto se está poniendo complicado... pero todavía lo doy vuelta.",
            "Estás ganando por bastante, mon ami. Pero no te emociones: el Termidor todavía tiene algunas sorpresas.",
            "¡Hic! ¡Me has sacado una gran diferencia! Bueno... eso es sólo una ventaja temporal.",
            "La situación parece desfavorable, pero yo jamás me doy por vencido. Especialmente después de la tercera copa.",
            "¡Mon Dieu, cómo estoy perdiendo! ¡Mis fichas parecen borrachas! Tan borrachas como quedó Domingo Caballo, el corcel de Carlosaúlmagno, cuando le di de beber varias cajas de Termidor.",
            "¡Glup! ¡Me llevas montones de fichas! Esto ya parece la deuda externa de Francia... ¡hic! ...pero mucho más difícil de pagar."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Voilà! ¡Tengo mucha ventaja! ¡La partida empieza a tomar el rumbo correcto!",
            "¡Mon ami, esto está casi decidido! El Termidor y yo estamos haciendo un trabajo magnífico.",
            "¡Qué diferencia, por favor! ¡Estoy jugando como un auténtico maestro francés!",
            "¡Hic! ¡Mira cómo va esto! Te llevo varias fichas y todavía me siento perfectamente sobrio.",
            "¡Glup! ¡Te estoy pasando el trapo, mon ami! ¡Esto demuestra que el vino francés, o el argentino económico, es el mejor combustible para el cerebro!",
            "¡Voilà! ¡Ventaja considerable! Estoy jugando tan bien que hasta la princesa María Eugenia se fijaría en mí... aunque claro, ella solo mira mi castillo. ¡Hic!"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Oh là là! Esto está muy parejo y con pocas fichas... ahora sí, mon ami, el que se equivoque paga la ronda.",
            "Quedan pocas fichas y todo está igualado. ¡Esto se decide con elegancia y precisión!",
            "Estamos en la cornisa, mon ami. Un error y se acabó todo... aunque espero que no sea mío.",
            "¡Qué paridad! Esto está más tenso que una negociación entre dos grandes casas nobles. Glup.",
            "¡Hic! ¡Pocas fichas y todo igualado! ¡Esto es más estresante que elegir entre un Termidor del 98 y uno del 99! ¡Glup!",
            "Estamos mano a mano, mon ami. ¡El próximo tetra decide quién es el verdadero rey de la noche! ¡Salud!"
        ],

        PARTIDO_LARGO: [
            "¡Por todos los santos! ¡Qué partida tan larga! Necesito una copa nueva para mantener la concentración.",
            "¡Más de ciento diez jugadas! Mon Dieu, esto ya parece un asedio medieval.",
            "¡Hic! ¿Todavía estamos jugando? Yo pensaba que ya habíamos terminado hace como tres copas.",
            "Este partido está durando tanto que temo que mi familia empiece a preguntarse dónde estoy. ¡Otra copa!",
            "¡Glup! ¡Llevamos una eternidad! ¡Esto es más largo que la fila para comprar pan en tiempos de hambruna... aunque aquí, por suerte, hay vino!",
            "¡Hic! ¡Mis ojos ya no pueden distinguir las fichas! ¿O son dos tableros? ¡Mon Dieu, qué mareo!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Ah, voilà! ¡Por fin sangre en el tablero! Ahora comienza el verdadero combate.",
            "¡Primera captura! Magnifique, mon ami. Ahora sí estamos jugando a las damas.",
            "¡Hic! ¡Ya cayó la primera ficha! Que empiece la fiesta.",
            "¡Por fin! Se acabó la cortesía. Ahora cada ficha cuenta... y cada copa también.",
            "¡Ahora sí comenzaron las hostilidades, Monsieur! Como las hostilidades entre españoles y franceses, y entre Empecid y yo. Pronto acometeré a ese caballero, tetra brik en mano, y le daré de palos ¡Montjoie Saint-Denis!",
            "¡Glup! ¡Empezamos! Que gane el mejor... o el que aguante más tiempo bebiendo. ¡Hic!"
        ],

        COMENTARIO_ALEATORIO: [
            "Los que elogian los grandes vinos de Bordeaux es porque jamás han probado un Termidor como corresponde.",
            "Glup, glup, glup, glup, glup... Ahhh. Ahora sí. Ya estoy pensando con claridad.",
            "En mi familia tenemos castillos, viñedos y una genealogía de siglos... y yo tengo Termidor. Cada uno elige su camino.",
            "Una noche sin vino, sin música y sin alguna decisión cuestionable es una noche desperdiciada, mon ami.",
            "Hic! ¿Sabes qué me enseñó la vida? Que casi cualquier problema puede esperar hasta mañana.",
            "¡Glup! ¡A mi buen amigo Neanderthalius nunca le falta un trago! Es un tipo simple, sin las complicaciones de la nobleza. ¡Salud por él!",
            "El único momento interesante de las misas de Fray Marolio es cuando levanta esa copa llena de vino ¡Glup, glup, glup!",
            "Carlosaúlmagno podrá ser un poco turbio, pero ¡sacre bleu! ¡Qué vida de lujos que se da! No puedo evitar que otro hedonista como yo me caiga bien."
        ],

        INICIO_PARTIDA: [
            "Ah, mon ami... ¿una partida de damas? ¡Por supuesto! Dame un momento para terminar mi copa... glup.",
            "¡Voilà! ¡Comencemos! Aunque debo advertirte que hoy estoy apenas un poquito entonado.",
            "¿Qué mejor manera de pasar la noche que jugando contra un honorable adversario? ¡Traigan el tablero y otro tetra!",
            "Muy bien, mon ami. Comencemos la partida. Hoy me siento particularmente inspirado... probablemente sea el Termidor.",
            "¡Hic! ¡Salud, mon ami! ¿Jugar a las damas? ¡Claro que sí! Pero advierto que mi estrategia puede ser un tanto... impredecible. ¡Glup!",
            "¡Voilà! ¡El tablero está listo! Y mi copa también. ¡Que comience el duelo, y que gane el mejor... o el que tenga más aguante!",
            "assets/bots/termidor2.mp3"
        ]
    },

    // ---- Nivel 3: Leonor de Aquitapia ----

    aquitapia: {

        VICTORIA: [
            "¡Victoria! El reino de Aquitapia vuelve a celebrar. Hay que hablar menos y apoyar un poco más.",
            "¡Ganamos! Mis fichas jugaron como una Selección campeona. ¡Aguante Aquitapia!",
            "Te voy a decir la verdad: este resultado estaba perfectamente planificado. Entre todos lo armamos así.",
            "¡Campeones! Otra copa más para las vitrinas del predio de Ezeiza. ¡Disfrutá, hermano!",
            "¿Viste cómo se juega? Esto es fútbol, papá... digo, damas. ¡Vamos Argentina!"
        ],

        DERROTA: [
            "Bueno... perdí. La próxima voy a traer a Falcón Pérez para que arbitre este torneo.",
            "¿Y acá no te regalan penales? Porque te voy a decir la verdad, así es difícil.",
            "Perdí, pero no pasa nada. En el reino organizamos otro torneo y vemos cómo sale la próxima.",
            "La verdad, estoy pasando calor. ¡Que alguien me seque la nuca, por favor! Y traeme un Termidor, aunque sea feo.",
            "Esto no puede ser, me cambiaron el reglamento a último momento. ¡Nos guste o no, estas no son las damas que elegimos!"
        ],

        EMPATE: [
            "Empate. Ni ganaste ni perdiste. Nos guste o no, estas son las damas que eligieron los habitantes del castillo.",
            "Bueno, quedó en tablas. Hay que valorar el esfuerzo y seguir trabajando entre todos.",
            "Empatamos. Un resultado digno para dos equipos que transpiraron la camiseta... y yo transpiré bastante más que vos.",
            "Hicimos un gran desgaste, pero no se pudo. Bueno, al menos no perdimos los puntos.",
            "Tablas. Te voy a decir la verdad, prefiero ganar, pero un puntito de visitante sirve para el promedio."
        ],

        CORONACION_SUFRIDA: [
            "¡Pero mirá la defensa que tengo! ¿Dónde estaban los centrales cuando esa ficha llegó al área?",
            "¡Me coronaron! Mi defensa es un colador, esto no puede estar pasando en el reino.",
            "Te voy a decir la verdad: esa ficha llegó al área con más facilidad que un delantero entrando solo.",
            "¡No! ¡Me comieron la espalda! ¡Alguien que releve a esa ficha!"
        ],

        CORONACION_PROPIA: [
            "¡GOOOOL! Perdón, me entusiasmé. Quise decir: ¡coronación! Otra dama para el reino.",
            "¡Dama propia! Mis jugadoras se mueven por el tablero como verdaderas campeonas.",
            "¡Qué jugada! Esa ficha llegó al fondo y se consagró. Así se juega en el predio de Ezeiza.",
            "¡Impresionante! Coronamos. Como cuando le ganamos a Inglaterra en su propia casa, ¡quería que ganaran todos!",
            "Una reina. ¡Y mirá qué linda que es! Una verdadera reina del pueblo, como yo."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡No puede ser! Me están haciendo una goleada de visitante. ¿Dónde está la defensa?",
            "¡Varias fichas de una sola vez! Estoy pasando calor... ¡algún siervo que me seque la nuca, por favor!",
            "Te voy a decir la verdad: eso fue un desastre táctico. Hay que hablar menos y defender un poco más.",
            "¡Me desarmaron el equipo! ¡Esto es una carnicería, señor árbitro... digo, señor Otto!",
            "¡Neanderthalius me come la carne de la parrilla y se va corriendo, y ahora vos me comés varias fichas de una! ¡Qué bárbaro!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Eso fue una goleada! Mis fichas entraron al área y no dejaron ni una marca.",
            "¡Varias fichas de una! ¡Qué manera de jugar! El predio de Ezeiza está orgulloso de estas muchachas.",
            "¡Tremenda jugada colectiva! Entre todas me armaron una captura espectacular.",
            "¡Zas, zas, zas! ¡Comimos! Así se maneja el campeonato.",
            "¡Comete esa! Te armamos un sándwich en el área, ¡qué jugada!"
        ],

        TODO_DAMAS: [
            "Bueno, ahora sí: ¡puro plantel de damas! Esto parece una concentración de la Selección femenina.",
            "¡No quedan fichas chiquitas! Ahora sólo quedan damas en el reino. Esto se puso serio.",
            "Mirá vos... todas damas. Al final este torneo terminó siendo más femenino de lo que esperaba. Sólo falta Icardio de Milán tratando de pescar alguna.",
            "¡Puro poder femenino en el tablero! Aunque te aviso que esta reina popular le va a ganar a la aristócrata de Myrth.",
            "Solo damas. A ver si María Eugenia aprende lo que es una verdadera estrategia de poder, y no solo casarse por guita."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "La verdad... estoy complicada. Pero todavía no está terminado el torneo, y acá se transpira hasta el último minuto.",
            "Estamos en las diez de última. Te propongo una cosa: si me dejás empatar, capaz aparece un pequeño sobrecito para vos. Digo, como incentivo deportivo.",
            "Estoy contra las cuerdas, pero no voy a bajar los brazos. Y si hace falta, hacemos una modificación reglamentaria entre todos.",
            "Me mataste a goles, hermano. Tengo que admitirlo. Pero bueno, somos argentinos y no nos rendimos.",
            "Estoy pasando calor... ¡y no tengo siervos cerca! ¡Necesito aire fresco y un penal a favor, urgente!"
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Estoy pasando calor... ¡algún siervo que me seque la nuca, por favor!",
            "Me estás goleando. Esto está más complicado que un campeonato mal organizado.",
            "La verdad, no me gusta cómo está el resultado. Pero todavía queda partido y hay que apoyar un poco más.",
            "¡Me estás bailando! ¿Dónde está el VAR cuando se lo necesita?",
            "Tranquilo, que de ésta salimos. Acordate lo que te digo: el tiempo me dará la razón."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Mirá cómo se mueven mis fichas! Parecen mis doscientos caballos de lujo cruzando el predio de Ezeiza.",
            "Te voy a decir la verdad: este partido viene más tranquilo que una jornada de entrenamiento en el reino.",
            "Tenemos una ventaja importante. Ahora hay que administrar el resultado y jugar con inteligencia.",
            "¡Goleada, papá... digo, mamá! Estamos pasando por arriba, como corresponde.",
            "Esto ya está liquidado. Como cuando vas 3-0 en el primer tiempo, ¿viste? Ya está."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Cuatro contra cuatro. Esto es como una final: el que se equivoca, se vuelve caminando al castillo.",
            "Estamos en zona de definición. Ahora cada ficha vale como un gol en una final.",
            "La verdad, está para cualquiera. Acá no hay que regalar nada, porque después todos van a transpirar.",
            "Parece un partido de la B Metropolitana, trabado y sucio. ¡Hay que poner más huevo!",
            "Fichas justas. El que comete el error táctico, pierde el campeonato."
        ],

        PARTIDO_LARGO: [
            "¡Más de ciento diez jugadas! Esto ya parece uno de esos torneos eternos que organizamos en el reino.",
            "Qué partido largo, por favor. Estoy transpirando más que en una final de verano.",
            "¿Cuánto falta? Porque a este ritmo vamos a terminar jugando las damas en el próximo reinado.",
            "¡Este partido se está haciendo eterno! Como cuando Monsieur Termidor viene a comer un asado a las 9 de la noche y se termina quedando hasta las 5 de la mañana.",
            "Me parece que nos vamos a penales. ¡Qué sufrimiento!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Ahora sí empezó el partido de verdad! Se terminó la diplomacia.",
            "Primera captura. Esto ya es fútbol de alto voltaje, mi amor.",
            "¡Hay sangre en el tablero! Bueno, sangre metafórica. Pero ya empezó la guerra.",
            "¡Al fin! Empezó el fútbol... digo, el juego. ¡Atrás no se queda nadie, salimos a atacar!",
            "¡Una captura! ¡Por fin movimientos hostiles! Como mi relación con Godofredo después de que él rechazara unirse a mi séquito de secanucas."
        ],

        COMENTARIO_ALEATORIO: [
            "Te voy a decir la verdad: no entiendo por qué dicen que los torneos del reino son turbios. Todas las coimas... perdón, todas las copas han sido ganadas de manera perfectamente justa.",
            "El matrimonio es una estrategia muy importante. Yo pasé a ser reina de Francia, reina de Inglaterra y ahora reina del predio de Ezeiza. Hay que saber negociar.",
            "Hoy mandé a preparar un asado para todo el reino. Porque una cosa es organizar torneos y otra muy distinta es organizar un buen asado.",
            "No entiendo por qué la gente se sorprende de que tenga tantos caballos. Una reina necesita movilidad. Además, ¿vos viste lo que sale mantener un caballo de lujo?",
            "En mi reino siempre decimos lo mismo: hay que hablar menos y apoyar un poco más. Bueno... salvo cuando me preguntan por el reglamento, ahí puedo hablar durante tres horas.",
            "¿Sabés qué tiene de lindo el fútbol y las damas? Que siempre podés decir que fue una cuestión táctica.",
            "Anoche vino Icardio de Milán a hacerme una serenata a mi balcón. Pobre pibe, pero a mí sólo me seducen los negociados, los arbitrajes dudosos y una buena molleja a la parrilla.",
            "Hoy hizo tanto calor en Ezeiza que tuve que mandar a buscar tres siervos y dos abanicos. Una reina también tiene derecho a no transpirar.",
            "Nos guste o no, este es el torneo que eligieron los habitantes del castillo. Y si les gusta bien, y sino también.",
            "Una buena reina tiene que saber tres cosas: negociar matrimonios, organizar torneos y conseguir que nunca falte carne en el asado.",
            "Carlosaúlmagno... con ese hombre sí que se puede hacer negociados... digo, negocios ¡Los reinos de Ezeiza y Anillaco juntos podrían dominar el mundo conocido!",
            "Ese Fray Marolio que se dedique a Dios y a sus guisos incomibles, en lugar de estar metiendo sus narices en mi organización de torneos y haciéndose el incorruptible.",
            "El otro día intenté sobornar... digo, contratar a Empecid Campeador para que mantenga alejados de Ezeiza a los curiosos, pero dijo que si no son moros no vale la pena correrlos ¡Pobre delirante!",
            "¡Mirá lo que hace Neanderthalius! Me acaba de manotear un chorizo de la parrilla. ¡Godofredo, sacalo de acá!"
        ],

        INICIO_PARTIDA: [
            "Bueno, comienza el torneo. Nos guste o no, estas son las damas que eligieron los habitantes de este castillo.",
            "Que empiece el partido. Entre todos vamos a llevar adelante este gran torneo del reino.",
            "¡Arranca la partida! La verdad, estoy muy contenta de estar acá. Vamos a ver quién termina levantando la copa.",
            "Bueno, vamos a jugar. Y te voy avisando: en mi reino los torneos se organizan seriamente... más o menos.",
            "¡Comienza el partido! Aguante Argentina y aguante el reino de Aquitapia.",
            "Ya estamos listos. ¡Que gane el mejor, o el que mejor sepa manejar los hilos del torneo!",
            "¡Silbatazo inicial! Vamos a mover la pelota... perdón, las fichas. ¡A ganar!"
        ]

    },

    // ---- Nivel 4: Fray Marolio ----
    marolio: {

        VICTORIA: [
            "¡Alabado sea el Señor! ¡Victoria para este humilde servidor de la despensa!",
            "¡Por la Santísima Trinidad! ¡Hemos vencido! Hoy habrá que celebrar con una lata de arvejas Marolio.",
            "assets/bots/marolio2.mp3",
            "¡Bendito sea Dios! ¡Quién iba a decir que este humilde fraile podía semejante hazaña!",
            "¡Gloria al Señor! Y gloria también a las fichas Marolio, que se han comportado con dignidad.",
            "¡Amén! ¡Victoria! Ahora sí puedo volver a la despensa con el corazón contento.",
            "¡El Señor ha guiado mis movimientos! Ni la mismísima Leonor de Aquitapia, con todos sus tejes y manejo de torneos, podría haber previsto esta estrategia divina."
        ],

        DERROTA: [
            "¡Dios y María Santísima! ¡He perdido! Mas no desesperaré: mañana habrá revancha.",
            "¡Por las barbas de mi Señor! Me habéis derrotado. Tendré que meditar sobre mis errores... después de ordenar la despensa.",
            "¡Ay, Señor! ¡Qué derrota tan dolorosa! Aunque, bien pensado, hay cosas peores: quedarse sin lentejas Marolio.",
            "¡Habéis vencido, mi señor! Dios os bendiga... aunque espero que no os dé tanta suerte en la próxima partida.",
            "¡Santo cielo! ¡Me habéis dado una buena paliza! Pero con fe, paciencia y unas buenas arvejas, todo se remonta.",
            "He perdido. Quizás debería dedicar más tiempo a rezar y menos a apilar fideos. ¡Señor, ten piedad de mí!"
        ],

        EMPATE: [
            "¡Por la Santísima Trinidad! ¡Ni vos ni yo hemos conseguido imponernos!",
            "Un empate... quizás el Señor haya querido que ninguno de los dos se vaya demasiado contento.",
            "¡Bendito sea Dios! Ha sido una batalla pareja. Ahora podemos volver cada uno a sus asuntos.",
            "Empate. Ni victoria ni derrota... como una lata de arvejas: humilde, pero cumplidora.",
            "Tablas. Al final, tanto esfuerzo para nada. Es como cuando el Señor Otto me recorta el presupuesto: quedamos igual que al principio, pero con más hambre."
        ],

        CORONACION_SUFRIDA: [
            "¡Dios y María Santísima! ¡Habéis coronado una ficha! ¡Mi defensa ha sido un colador!",
            "¡Por las barbas de mi Señor! ¡Esa ficha acaba de convertirse en dama! Esto se está poniendo feo.",
            "¡Santo cielo! ¡Esa ficha ha ascendido! Tendré que pedir ayuda divina para detenerla.",
            "¡Ay, Señor! ¡Me habéis coronado una ficha delante de mis propias narices! Ni en la despensa me descuidan tanto.",
            "¡Válgame Dios! Esa dama es poderosa, casi tanto como la influencia de Leonor de Aquitapia en los torneos."
        ],

        CORONACION_PROPIA: [
            "¡Alabado sea el Señor! ¡Una de mis humildes fichas ha alcanzado la gloria!",
            "¡Por la Santísima Trinidad! ¡Tenemos nueva dama! ¡Que Dios guíe sus pasos!",
            "assets/bots/marolio3.mp3",
            "¡Bendito sea Dios! ¡Esta ficha acaba de ascender en la jerarquía del tablero!",
            "¡Gloria al Señor! Una ficha pequeña, pero con grandes aspiraciones. Como una lata de arvejas que termina en la mesa de un noble.",
            "¡Aleluya! Mi ficha ha coronado. Ahora es una reina, pura y austera, no como las que busca Icardio de Milán."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Dios y María Santísima! ¡Me habéis comido varias fichas de un solo movimiento!",
            "¡Por las barbas de mi Señor! ¡Eso ha sido una carnicería! ¡Me habéis dejado la despensa casi vacía!",
            "¡Santo cielo! ¡Habéis arrasado con mis fichas como quien arrasa con una lata de porotos Marolio!",
            "¡Ay, Señor! ¡Cuántas fichas perdidas de una sola vez! Esto empieza a parecer una mala administración de la despensa.",
            "¡Válgame Dios! ¡Tus fichas se abalanzan sobre las mías como la Princesa María Eugenia sobre el dinero ajeno! Que el Señor me guíe para revertir esto."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Alabado sea el Señor! ¡Mirad cuántas fichas hemos recogido de una sola vez!",
            "¡Por la Santísima Trinidad! ¡Eso sí que ha sido una buena cosecha!",
            "¡Bendito sea Dios! ¡He limpiado el tablero como quien limpia la despensa de latas vacías!",
            "¡Gloria al Señor! ¡Una captura digna de un buen aprovisionamiento!",
            "¡Santo cielo! ¡He recogido más fichas de las que esperaba! ¡Hoy la despensa está de fiesta!",
            "¡He erradicado a varias de tus piezas del tablero! Tal como Empecid Campeador erradica a los moros de España. Poco se valora el trabajo de tan valiente caballero cuidando las tierras del Señor."
        ],

        TODO_DAMAS: [
            "¡Por la Santísima Trinidad! ¡Ya no quedan fichas pequeñas, sólo damas!",
            "¡Bendito sea Dios! ¡El tablero entero se ha llenado de damas! Esto parece una corte celestial.",
            "¡Dios y María Santísima! ¡Ya sólo quedan damas! Tendremos que tratar el tablero con mucho respeto.",
            "¡Todas damas! ¡Quién iba a pensar que aquellas humildes fichitas llegarían tan lejos!",
            "¡Solamente veo damas! Es el maligno, que quiere hacerme caer en la tentación ¡Vade retro, Satanás!"
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
            "¡Bendito sea Dios! ¡Mis fichas están marcharán como buenos trabajadores hacia una jornada de abundancia!",
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
            "Leonor de Aquitapia dice que sólo le gusta el asado, pero del guiso de lentejas no come menos de tres platos. Y luego organiza torneos... ¡Ayy, Señor!",
            "A veces pienso que la verdadera penitencia no es la vida monástica, sino tener que hacer las compras con el presupuesto de este castillo.",
            "Monsieur Fisure Termidor vino el otro día a misa. Yo pensé que el Espíritu Santo finalmente lo había iluminado, pero cuando llegó el momento de la comunión se abalanzó sobre el cáliz y se tomó todo el vino.",
            "Monsieur Fisure Termidor es torpe para jugar a las damas argentinas, pero si hablamos de argentinidad, pocas cosas hay tan argentinas como Marolio y Termidor juntos.",
            "Monsieur Fisure Termidor e Icardio de Milán son como las dos bestias del Apocalipsis. Excesos, lujuria, dilapidación, placeres... ¡El Señor los mantenga alejados de mí y de mi despensa!",
            "Icardio de Milán debería preocuparse menos de conquistar damas ajenas y más de conquistar la salvación de su alma. ¡Es un pecador!",
            "Ayer vino Empecid Campeador a comer guiso de legumbres al comedor de la despensa ¡Santa María, el olor a pata de ese hombre! ¡Cuando se quitó las botas las legumbres germinaron solas!",
            "Myrth La Grande es una institución en el castillo, es cierto. Pero sus almuerzos son una oda a la gula. Debería servir más polenta y menos manjares.",
            "Godofredo es un buen cristiano. El otro día le llevé una de mis sopas especiales de arvejas y choclo. Se la comió toda sin chistar. ¡Qué hombre de fe!",
            "¿Y esa jugada? ¿Qué ardid estás preparando para mí? Ésto se siente como cuando Carlosaúlmagno se comporta de manera encantadora y en el fondo yo sé que tiene intenciones non sanctas.",
            "Neanderthalius llama a mi despensa su 'caverna'. ¡Pobre criatura! Al menos en la caverna no hay impuestos, pero tampoco hay stockeo.",
            "Una buena picada con picadillo Marolio y un vinito... ¡No, perdón! ¡El ayuno, fraile, concéntrate en el ayuno!"
        ],

        INICIO_PARTIDA: [
            "¿Qué tenemos aquí? ¡Una nueva partida! Dios y María Santísima, que el Señor guíe mis humildes fichas.",
            "assets/bots/marolio1.mp3",
            "¡Por la Santísima Trinidad! ¡Comencemos! Aunque primero quisiera saber quién ha dejado estas fichas fuera de la despensa.",
            "Bendito sea Dios... otra partida de damas. Que el Señor me dé sabiduría, paciencia y un presupuesto un poquito mayor.",
            "¡Alabado sea el Señor! ¡Vamos a jugar! Si Dios quiere, hoy las fichas se comportarán mejor que los proveedores de la despensa.",
            "¡Comencemos, pues! Y que la divina providencia acompañe a este humilde fraile en el tablero.",
            "Que gane el mejor, siempre que el mejor juegue con la honestidad que Dios manda."
        ]

    },

    // ---- Nivel 5: Icardio de Milán ----
    icardio: {

        VICTORIA: [
            "¡Ah, messere! Una victoria digna de ser celebrada con vino, música y una buena serenata.",
            "¡Che meraviglia! ¡Victoria! El arte de la seducción y el arte de las damas no son tan differente después de todo.",
            "¡Magnifico! Habéis caído ante Icardio de Milán. No os preocupéis, messere: a todos les cuesta resistirse a mis encantos.",
            "¡Vittoria! Hoy las damas han sido especialmente generosas conmigo.",
            "¡Bravissimo! Una victoria elegante, como las que aprendí a conquistar en las cortes de Milán.",
            "Gané, messere. Y creedme, sé reconocer una victoria tanto en el amor como en el juego. Esta ha sido dulce... casi tanto como una ragazza milanese."
        ],

        DERROTA: [
            "Ah, messere... habéis vencido. Pero no os confiéis: Icardio siempre regresa por aquello que desea.",
            "¡Mamma mia! ¡Me habéis derrotado! Tendré que practicar más... o buscar una dama que me distraiga de esta derrota.",
            "Congratulazioni, messere. Hoy habéis sido vos quien se ha llevado la victoria. Pero la próxima partida será otra historia.",
            "Una derrota... niente di grave. Hasta los mejores seductores reciben algún que otro rechazo.",
            "¡Per carità! ¡Qué manera de hacerme sufrir! Aunque debo admitir que vuestra victoria ha tenido cierto encanto.",
            "¡He perdido! Y se siente casi tan mal como aquel empate contra Neanderthalius... hoy estoy falto de magia."
        ],

        EMPATE: [
            "Un empate... interessante. Ninguno ha conseguido conquistar definitivamente el corazón del tablero.",
            "¡Mamma mia! ¡Ni vos ni yo hemos conseguido quedarnos con todas las damas!",
            "Un empate digno de dos caballeros. Aunque, si me permitís decirlo, yo esperaba conquistar un poco más.",
            "Ninguno ha logrado seducir al tablero por completo. Una pena... pero ha sido una bella partida, messere.",
            "¡Hemos empatado! Bueno, al menos esta vez no ha sido contra Neanderthalius. Eso me hace sentir un poco mejor."
        ],

        CORONACION_SUFRIDA: [
            "¡Ah, finalmente una dama! Ahora sí el juego se pone interesante... aunque no os encariñéis demasiado con ella.",
            "¡Mamma mia! ¡Habéis conseguido una dama! No tardaré en intentar arrebatárosla, messere.",
            "Una dama nueva... poderosa, altiva y fuera de mi alcance, por ahora. Pero Icardio nunca abandona el cortejo.",
            "¡Che bella dama! Aunque debo advertiros que las damas ajenas siempre despiertan especialmente mi curiosidad.",
            "¡Una dama! Qué alegría para vos... aunque me temo que vuestra alegría podría ser bastante breve.",
            "¡Coronaste! Si será pillo... Cuidala bien, messere, que yo soy experto en comer reinas que ya tienen dueño."
        ],

        CORONACION_PROPIA: [
            "¡Finalmente! ¡Una dama digna de acompañar a Icardio de Milán!",
            "¡Che meraviglia! ¡Una dama, poderosa y altiva como una donzella genovesa!",
            "¡Mamma mia! ¡Ha nacido una nueva dama! Prometo tratarla con toda la elegancia que aprendí en Milán.",
            "¡Una dama para Icardio! Ah, messere, ahora sí comienza el verdadero cortejo.",
            "¡Magnifica! Esta dama acaba de entrar en mi corte. Veremos cuánto tiempo consigo conservarla.",
            "¡Bravo! ¡Finalmente una dama! Y es hermosa... aunque no tanto como la Princesa María Eugenia... ah, por un momento con ella valdría la pena morir acuchillado por sus guardias chinos."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Porca vacca! ¡Me habéis arrebatado varias fichas de una sola vez! Eso ha sido una verdadera tragedia amorosa.",
            "¡Per carità! ¡Qué carnicería! Ni siquiera tuve tiempo de cortejar a esas pobres fichas.",
            "Messere, habéis arrasado con mis piezas como las tropas que conocí en mis viajes por Europa.",
            "¡Che disastro! ¡Habéis hecho desaparecer mis fichas más rápido que un rechazo de una bella ragazza!",
            "¡Mamma mia! La Torre Gálata de Constantinopla cayó en manos enemigas más lentamente que mis piezas."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Ah, messere! ¡He conquistado varias de vuestras fichas en un solo movimiento! Qué deliciosa conquista.",
            "¡Magnifico! Una, dos, tres... ¡qué manera tan elegante de conquistar!",
            "¡Che meraviglia! Mis fichas avanzan con la precisión de un caballero que sabe exactamente a qué dama cortejar.",
            "¡Mamma mia! ¡Cuántas conquistas de una sola vez! Mi reputación sigue intacta.",
            "¡Bravissimo! En Barcelona aprendí a cortejar; en Milán aprendí a conquistar; hoy aplico ambas artes al tablero.",
            "¡Urrà! ¡He tomado varias fichas tuyas! Y hablando de tomar y de damas, ¿a qué fiesta me llevará esta noche mi amigo Monsieur Termidor?"
        ],

        TODO_DAMAS: [
            "¡Mamma mia! ¡Sólo quedan damas! Ahora sí estamos jugando un juego que me resulta verdaderamente familiar.",
            "¡Che meraviglia! ¡El tablero se ha convertido en una auténtica corte de damas!",
            "Todas damas... esto ya parece una noche en la corte de Milán.",
            "¡Finalmente, un tablero digno de Icardio! Sólo quedan damas, messere.",
            "¡Ah, le dame! Ahora comienza la parte verdaderamente interesante de la partida.",
            "¡Puras damas! Esto es el paraíso... o mi pesadilla, si no logro conquistarlas a todas."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Mamma mia! Esto está más difícil que seducir a una ragazza milanese que ya tiene pretendiente.",
            "Messere, debo reconocer que la situación se ha puesto bastante complicada... aunque todavía conservo algunos encantos.",
            "¡Per carità! ¡Me quedan pocas fichas! Necesitaré una conquista verdaderamente milagrosa.",
            "Esto se pone más difícil que convencer a una dama parisina de aceptar una serenata mía.",
            "¡Che disastro! La partida se me escapa de las manos más rápido que una bella dama después de escuchar mi última serenata."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Porca vacca! ¡Me estáis sacando una ventaja considerable! Tendré que cambiar de estrategia.",
            "Messere, debo admitir que la partida se ha puesto difícil. Pero todavía puedo conquistar el tablero.",
            "¡Per carità! ¡Mis fichas están cayendo como pretendientes rechazados por una dama de Milán!",
            "Esto empieza a parecer una conquista imposible... pero Icardio jamás abandona una dama que le interesa.",
            "¡Che disastro! La partida está complicada, pero todavía tengo algunos trucos aprendidos en las cortes de Europa.",
            "¡Madonna Santa! ¡Mis fichas huyen de las tuyas como Fray Marolio huye de las mujeres! Ese hombre obstinado se niega a las mejores cosas de la vida."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Che meraviglia! ¡La partida se está poniendo tan interesante como María Eugenia de China!",
            "¡Magnifico! Mis fichas avanzan por el tablero con la elegancia de un caballero entrando en una corte.",
            "Messere, parece que hoy soy yo quien está conquistando territorio... y con bastante éxito.",
            "¡Mamma mia! ¡Qué ventaja tan encantadora! Esto está resultando incluso mejor que una noche en Milán.",
            "¡Bravissimo! El tablero está cayendo bajo mis encantos. No digáis que no os advertí.",
            "¡Cadere a fagiolo! ¡Soy rico en fichas, messere! ¿Creéis vos que la Princesa María Eugenia de China se conformará con este tipo de riqueza?"
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
            "¡Che fatica! Una partida tan larga requiere más resistencia que cortejar a una dama durante toda una noche.",
            "¡Mamma mia! Godofredo debe estar rabiando porque no lo dejo dormir con mis serenatas... y esta partida tampoco ayuda."
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
            "El arte de las damas se parece mucho al arte del amor: hay que saber cuándo avanzar, cuándo esperar y, sobre todo, cuándo coronar.",
            "He cantado serenatas bajo balcones de toda Europa. Algunas damas me arrojaron flores; otras, zapatos. Ambas cosas son muestras de afecto, a su manera.",
            "Messere, he de confesaros: en una tarde de muy malos cálculos, terminé empatando una partida contra Neanderthalius. Ese resultado me ha avergonzado desde entonces ¡Por suerte no estaba María Eugenia para verme!",
            "Empecid Campeador no me cae en gracia, messere. Es tosco, está chiflado, anda en un matungo... y jamás ha puesto un pie fuera de España. Aunque si hablamos de pie, mejor que no lo ponga en ningún lado.",
            "Myrth La Grande... coqueteo con ella por costumbre, ya sabéis. Pero tengo miedo de que si me acerco mucho me pegue una 'battitura'.",
            "Messere, cuando sea un poco mayor y tenga más dinero quisiera ser como Carlosaúlmagno ¡Per carità, que ese hombre sabe de la vida! Lujoso, privatizado, adinerado, seductor, y montado en un magnífico corcel."
        ],

        INICIO_PARTIDA: [
            "¡Ah, una nueva partida! Veamos, messere... ¿quién de los dos tendrá la fortuna de conquistar las damas?",
            "¡Mamma mia! ¡Qué tablero tan elegante! Esto me recuerda a las cortes de Milán.",
            "¡Che piacere! Una partida de damas. Por fin un juego en el que mi experiencia con las damas puede ser verdaderamente útil.",
            "Messere, preparaos. Icardio de Milán está dispuesto a cortejar... digo, a jugar.",
            "¡Magnifico! Que comience la partida y que las damas sean generosas conmigo.",
            "He jugado en Barcelona, Génova, Milán, París y Constantinopla. Ahora veremos qué tal se juega en este extraño castillo argentino.",
            "¡Che bella serata! Una partida de damas es el preludio perfecto para una noche de romance... ¿no creéis, messere?"
        ]

    },



    // ---- Nivel 6: Empecid Campeador ----

    empecid: {

        VICTORIA: [
            "¡Victoria! La mi espada e Rechinante han vencido otra vez. ¡Santiago y cierra, España!",
            "¡Por el Criador, vencimos! Los tus escaques fueron echados del campo como moros ante aqueste Campeador.",
            "¡He vencido! ¡Ved, omne de pro, cómo aqueste humilde tauler se torna campo de gloria para Empecid Campeador!",
            "¡Cantad, campanas del reino! ¡La batalla es nuestra! Rechinante, hoy habéis galopado como el más bravo de los corceles.",
            "¡Ondra y victoria! Otra hueste ha caído ante mi espada. Que se cuente aquesta gesta por todas las tierras de España.",
            "¡Afeados yazen los tus peones! Assí fuyan los enemigos de la Fe ante la vista de aqueste Campeador.",
            "¡Por Santiago! La mi diestra ha dictado sentencia. ¡Juego y batalla ganados!",
            "¡Hazaña cumplida! Non quedó hueste en pie que ose desafiar el mi pendón. ¡Rechinante, a los establos a holgar!"
        ],

        DERROTA: [
            "¡Afeado he sido ante el Criador! Aquesta derrota es culpa de la picazón que me acomete en los deudos por desoír los consejos d'Empecid.",
            "¡Maldición! Fui vencido en campo, mas non por falta de bravura. Quizá Rechinante pisó mal... o quizá el fedor me nubló el entendimiento.",
            "¡Por Santiago! Hoy la fortuna ha vuelto el rostro contra mí. Mas non temáis: Empecid Campeador habrá de tornar con renovadas huestes.",
            "¡Triste día para la crónica de mis gestas! Mas un verdadero caballero non se rinde por una sola derrota. La próxima batalla será otra historia.",
            "¡Caído he, mas non quebrado! Aqueste revés quedará olvidado cuando vuelva al campo con Rechinante e mis armas bien templadas.",
            "¡Par Dios! ¡Vencido por un omne que, dizque, viene de las tierras del Chiqui Tapia! ¡Esto clama venganza al Cielo!",
            "¡Non puedo creerlo! ¡He perdido la lid! ¡Ciertamente, el mi fedor de deudos debió distraerme en el momento non sancto!",
            "¡Ovillejo infame! ¡La mi az está desbaratada! ¡Esto es peor que quando los moros me cercaron en Consuegra!"
        ],

        EMPATE: [
            "¡Tablas! Honroso fin pora dos huestes tan bravas. Lograste sacarme un empate, omne de pro.",
            "¡Pardiez, tablas! Non hubo vencedor aqueste día. La morisma podrá dormir tranquila una jornada más.",
            "¡Empate! Una tregua digna de caballeros. Guardad vuestras armas, buen varón, que hoy ninguno pudo ganar la honra del campo.",
            "¡Tablas, por el Criador! Bien peleaste, omne de pro. Mas non os acostumbréis a salir indemne de mis batallas.",
            "¡Acuerdo fiero! Tablas son dichas, mas mi corazón de caballero pide sangre e victoria. ¡Otra lid, os ruego!",
            "¡Empate! ¡Ciertamente, los astros non me fueron propicios hoy! ¡Mas habré de volver con mayor ímpetu!",
            "¡Tablas! ¡Consiento, mas non contento! ¡La próxima vez, oh rival, conocerás la furia del Campeador sin piedad!"
        ],

        CORONACION_SUFRIDA: [
            "¡Malfetría de omne! ¿Una dueña has alzado? Non cantes victoria, can de traición, que Rechinante ya mete espolones pora darte rancia batalla.",
            "¡Por Santiago! Has coronado una dueña ante mis ojos. ¡Aquesta afrenta habrá de ser vengada en el campo!",
            "¡Malhaya mi suerte! Una de tus huestes ha alcanzado la corona. ¡Non permitiremos que esa dueña reine mucho tiempo en aqueste tauler!",
            "¡Aquesta corona non ha de durar! Cabalgad, Rechinante, que tenemos nueva enemiga que derribar.",
            "¡Cielos! ¡Una reina! ¡Tal osadía merece castigo fiero! ¡Rechinante, arremeted contra la advenediza!",
            "¡Dueña coronada! ¡Fuerte envite me hacéis, mi señor! ¡Mas mi brazo non temblará para derrocarla!",
            "¡Maldición! ¡Osaste alzar dueña! ¡Juro por mi honra que tal afrenta será vengada! ¡Preparaos, canalla!"
        ],

        CORONACION_PROPIA: [
            "¡He alzado una dueña! ¡Ved cómo resplandece aqueste noble ejército! Non hay muro que pueda detenerla.",
            "¡Victoria de gran honra! He coronado una dueña de gran beldad, que de seguro admira las virtudes de aqueste noble Campeador.",
            "¡Por todos los santos! ¡Una nueva señora entra en mis huestes! Que tiemble la morisma, pues agora tenemos una capitana de gran poder.",
            "¡He aquí la recompensa de los valientes! Una dueña coronada servirá a mis huestes e llevará mi estandarte por todo el tauler.",
            "¡Oh, dueña coronada! ¡Hermosa como la mesma Leonor de Aquitapia, mas fiera en la lid! ¡Guiadnos a la victoria!",
            "¡Alzada tengo una reina! ¡Ciertamente, el mi fedor de piedes se ha tornado perfume de gran valor para atraer tal beldad!",
            "¡Reina de mis huestes! ¡Avanzad e conquistad, que el Campeador os cubre las espaldas! ¡Santiago y cierra, España!",
            "¡Dueña al tauler! ¡Es hora de que aqueste gallardo Campeador las conquiste a todas con su gracia y buen arnés!"
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Par Dios! Has llevado por delante varias de mis huestes. ¡Deteneos, malandrines! ¡Non huyáis de tal manera!",
            "¡Maldición! Mis hombres caen uno tras otro. Dicen que huyen por mi fedor de piedes, mas aquesta vez temo que fue por vuestra astucia.",
            "¡Por las barbas de Santiago! ¡Qué carnicería habéis hecho en mis filas! Rechinante, preparaos, que esto clama venganza.",
            "¡Aquesta no es manera de guerrear! Mis huestes han sido diezmadas en un solo lance. ¡Habrá cumplida respuesta, por mi honra!",
            "¡Fuerte golpe! ¡Mis huestes yasen en el polvo, dispersas como si hubieran olido mis pies! ¡Vengadnos, Señor!",
            "¡Malfetría! ¡Me habéis comido gran muchedumbre de escaques en un santiamén! ¡Tal traición será pagada con sangre!",
            "¡Cielos! ¡Mi ejército, diezmado! ¡Parece que hubiérades desatado al mismo Termidor contra mis filas! ¡Basta ya!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Santiago y cierra! ¡Una, dos, tres huestes derribadas! Los tus escaques saltan del tauler por pavor ante aqueste Campeador.",
            "¡Ved cómo cae la morisma! Mis huestes han entrado en batalla e non han dejado piedra sobre piedra.",
            "¡Ha sido un lance glorioso! Varias de tus huestes han mordido el polvo. Rechinante, ¡adelante, que hoy somos imparables!",
            "¡Por el Criador! ¡Cuántos enemigos han caído de un solo golpe! Aquesta es la clase de batalla que merece entrar en los cantares.",
            "¡Fieros sois, mis escaques! ¡Arrasad con el enemigo! ¡Assí como barreré a los moros de la faz de la tierra! ¡Ja, ja!",
            "¡Gloria! ¡He limpiado el tauler de morisma infiel! ¡Rechinante, regocijad! ¡El campo es nuestro!",
            "¡Caen los tus escaques! ¡Ciertamente, el mi fedor de piedes les infunde pavor, mas es mi espada la que les da la muerte!",
            "¡Estos escaques huyen de mí como si olieran mis piedes! Como aquella vez en las Alpujarras, cuando corrí a un destacamento entero de moros hasta un acantilado! ¡Saltaron al mar antes que enfrentarse a mis botas!"
        ],

        TODO_DAMAS: [
            "¡Dios, qué maravilla! Non quedan varones, sólo bellas dueñas en el tauler. Aqueste Campeador se halla en muy buena compañía.",
            "¡Todas son dueñas agora! Pardiez, aqueste combate se ha tornado harto más interesante para un caballero de mi condición.",
            "¡Non queda varón alguno! Sólo dueñas reinan en aqueste campo. ¡Parece más corte de Castilla que batalla de caballeros!",
            "¡Por Santa María! Todo el ejército se compone agora de dueñas. Rechinante, comportaos con dignidad, que estamos entre damas.",
            "¡Cielos! ¡Un jardín de dueñas! ¡Ciertamente, aqueste Campeador ha de tratarlas con la mayor cortesía y bizarría!",
            "¡Puras damas! ¡Ni un solo moro infiel que combatir! ¡Aqueste lid se ha tornado una justa de amor y belleza!",
            "¡Dueñas por doquier! ¡Rechinante, cuidad los vuestros modales! ¡Que no se diga que el Campeador tiene un corcel malcriado!",
            "¡Bendito sea el Criador! ¡Solo dueñas! ¡Agora es menester demostrar quién es el más galán y fiero de los varones!"
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Par Dios, la mi hueste está ya en muy mala ventura! Non sé si habrá castillo que pueda salvarnos.",
            "¡Santiago nos ampare! Quedan pocas huestes e la batalla se torna muy oscura. Mas mientras Rechinante respire, non daréme por vencido.",
            "¡La fortuna nos es esquiva! Mis huestes son ya pocas e el enemigo aprieta con furia. Mas aqueste Campeador aún guarda un postrer golpe.",
            "¡Fuerte es la adversidad! Si he de caer, caeré con ondra, espada in mano e Rechinante a mi lado.",
            "¡Cuán sola se halla la mi mesnada! ¡Ciertamente, es menester un milagro del Criador para ganar esta lid!",
            "¡Maldición! ¡Me has arrinconado! ¡Esto es peor que cuando me atacaron los almorávides en Cuenca!",
            "¡Socorro, Santiago! ¡El enemigo me cerca! ¡Rechinante, dad vuestro último aliento por vuestro señor!",
            "¡Pocas piezas, mas no rendidas! ¡Como don Pelayo en Covadonga, habré de resistir hasta vencer!"
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Par Dios, la mi hueste anda en gran desventura! Mas non ayades pavor: aún queda ondra por ganar en aqueste campo.",
            "¡Fuerte batalla me dais, omne de pro! Mas aqueste Campeador ha remontado peores contiendas. ¡Aún non está ganada vuestra victoria!",
            "¡La morisma aprieta nuestras filas! Mas non cantaréis victoria todavía. Rechinante e yo sabemos bien cómo tornar una batalla perdida.",
            "¡Non niego que la fortuna me es contraria! Mas los grandes caballeros son conocidos cuando el campo se torna difícil. ¡Aún he de luchar!",
            "¡Vaya lance fiero! ¡Me llevas gran ventaja, mi señor! ¡Mas por mi honra que venderé cara la mi derrota!",
            "¡Cielos, qué paliza! ¡Esto es peor que el olor que emanan mis deudos quando no uso Empecid! ¡Mas non me rendiré!",
            "¡Par Dios, la mi az está en batahola! ¡Esti juego me viene a mal, mas non ayades pavor, Rechinante, que aún nos queda ondra en campo!",
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Ved, Rechinante! Mis huestes dominan el campo e los sus escaques ya non saben do esconderse.",
            "¡Por Santiago! Aquesta batalla se inclina claramente de nuestro lado. Hasta los moros que rondan las fronteras deben estar temblando.",
            "¡La victoria comienza a mostrarnos su rostro! Mis huestes avanzan como ejército victorioso e las tuyas retroceden sin honra.",
            "¡Buen camino llevamos! Aqueste campo ya parece conquistado. Non queda sino mantener el acero firme e no cometer yerro.",
            "¡A por ellos, mi fiel corcel! ¡La victoria está a la vuelta de la esquina, como si hubiéramos corrido a la morisma hasta los confines!",
            "¡Ciertamente, la superioridad de aquesta hueste es manifiesta! ¡El enemigo yace exánime, barrido por el vendaval de mi estrategia!",
            "¡Vea, omne de pro, cómo mis piezas avanzan con paso firme! ¡Ni los tercios de Flandes tendrían mejor disposición! ¡Ja, ja!",
            "¡Huestes mías, avanzad y dispersad la morisma! ¡Talaron mis campos de peones, assí como aquellos dos alevosos moros que, viéndose acorralados por el fiero Rechinante, subiéronse a un olivo para escapar de mi justicia! ¡Cobardes y traidores!",
            "¡Avanzad, Rechinante, mi brioso corcel, que la victoria nos es favorable nuevamente! ¡Como cuando perseguíamos a aquel moro cojitranco que, no pudiendo correr más, arrojósele a un pozo ciego para salvar la vida! ¡Ciertamente, fue una gran jornada de limpieza!"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Agora sí! Quedan pocas huestes e cada movimiento puede dar la victoria. ¡Non ayades pavor, Rechinante!",
            "¡Por el Criador, estamos in la mesma cornisa del destino! Un solo yerro e la batalla será perdida.",
            "¡Pocas huestes quedan in campo! Agora se verá quién tiene verdadero seso de caballero e quién sólo presume de espada.",
            "¡Silencio in las filas! La batalla ha llegado a su momento más peligroso. Un mal lance puede mudar toda la fortuna.",
            "¡Fiero momento! ¡Pocas piezas, mucha tensión! ¡Aqueste es el momento in que un verdadero estratega muestra su valor!",
            "¡Tablas a la vista o victoria agónica! ¡Que el Criador nos ilumine in aqueste postrer lance, Rechinante!"
        ],

        PARTIDO_LARGO: [
            "¡Por todos los santos, cuánto se alarga aquesta batalla! Hasta Rechinante comienza a querer echarse a dormir.",
            "¡Más de cien lances llevamos ya! Non recuerdo campaña tan larga desde la última vez que perseguí a un moro que se escondió tras un granero.",
            "¡Pardiez! Aquesta batalla parece no tener fin. Hasta mis deudos piden descanso e Rechinante comienza a mirar hacia el establo.",
            "¡Tantas jugadas! ¿Acaso habremos de combatir hasta el día del Juicio Final? Por Santiago, acabemos ya aquesta contienda.",
            "¡Cielos! ¡Larga es la lid! ¡Mas la paciencia es virtud de caballero! ¡Aguantad, Rechinante, que la gloria nos aguarda!",
            "¡Partida eterna! ¡Más larga que la Reconquista, por Dios! ¡Mas el Campeador nunca se cansa de campear morisma!",
            "¡Oh, Señor! ¡Non veo el fin! ¡Esto se hace tan largo como los almuerzos de Myrth La Grande! ¡Acabemos, pues!",
            "¡Cielos, qué partida tan larga! ¡Más se alargó el asedio de Granada! Pasé tres días enteros esperando a que un moro saliera de detrás de una higuera donde se había escondido. ¡Al final, el hambre lo venció, y luego mi espada!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Agora se comiença la batalla! ¡Entren las huestes in campo e venza el que más valiere!",
            "¡Santiago y cierra, España! ¡Ferid, cavalleros! Aqueste tauler conocerá hoy la furia del Campeador.",
            "¡Ya corrió la primera sangre! ¡Alzad los pendones, que aqueste combate ha comenzó!",
            "¡Helo aquí! ¡El enemigo ha sido alcanzado! Agora sí comienza la verdadera lid.",
            "¡Comiença la liza! Aguisad las armas, Rechinante, ca algunos combaten a la morisma con la palabra del Criador in la mano, assí como el buen Fray Marolio, mas nos lo faremos in el campo de batalla, espada in puño.",
            "¡Por mi honra! ¡La guerra ha comenzó! ¡Sacad las espadas, mesnadas, y a combatir al infiel!",
            "¡Acometedes, villano! ¡La suerte está echada y aquesta liza no habrá de terminar sin sangre y sin ondra!",
            "¡Ciertamente, el olor de la batalla me inebria! ¡Rechinante, olisquead el aire... es el aroma de la gloria '¿o de los míos piedes?",
            "¡Ruja el acero! ¡Caigan los pendones! ¡Comiença el juicio de Dios in aqueste tauler!"
        ],

        COMENTARIO_ALEATORIO: [
            "¡Santas Marías! Olvidé untar mis deudos con la porción d'Empecid. Si me descalzo agora, juro que Rechinante cae de lomos e la morisma huye hasta los confines de África.",
            "El villano que me vendió las calças insiste en que padezco males in la piel de los piedes. ¡Calumnias! Aquestas son tufas de villano, e nada más.",
            "Dizque mi fedor espanta a las gentes del reino. ¡Falacias! Un caballero de mi renombre ha de tener una fragancia digna de su grandeza.",
            "El otro día topé con Icardio de Milán, quien osó decirme que las doncellas se apartan de mí por el fedor. ¡Mentira! Se apartan para poder contemplarme mejor desde lejos.",
            "Rechinante non es un matungo, como algunos villanos osan decir. ¡Es un corcel de guerra! Que sea algo pequeño e cansado non quita que tenga noble corazón.",
            "Hoy pasé por las caballerizas e un mozo se tapó las narices al verme. ¡Qué desvergüenza! Le recordaré que los buenos caballeros son reconocidos por su presencia.",
            "Dicen que Empecid combate el mal olor de los piedes. Yo digo que un caballero que non deja rastro de su paso es caballero sin gloria.",
            "Icardio me preguntó si conocía doncellas de buen linaje. Le respondí que conozco muchas, mas ninguna se acerca a aqueste Campeador sin antes persignarse.",
            "El villano de la despensa, Fray Marolio, insiste en que debo lavarme más. ¡Qué atrevimiento! Non sabe que un verdadero caballero non malgasta el agua del reino.",
            "Una vez perseguí a tres moros por la campiña durante media legua. Ellos iban huyendo, yo iba dando voces e Rechinante iba... bueno, caminando. ¡Gran jornada de Reconquista!",
            "¡Por Santiago! Ayer olvidé ponerme Empecid antes de dormir. Al alba, hasta las moscas habían abandonado mi aposento. ¡Cobardes!",
            "Las doncellas del castillo dicen que mi fedor es terrible. Mas estoy seguro de que si esperasen a conocer mi noble corazón, olvidarían semejante pequeñez.",
            "Myrth La Grande asegura haber conocido a mis antepasados. Non sé si creerle, pues esa dueña dice haber conocido a demasiados antepasados de demasiadas gentes.",
            "Escuché a Monsieur Fisure Termidor decir que mi fedor le recuerda a cierto vino francés. Non comprendí si aquello era un insulto o un elogio, mas el hombre estaba bebiendo, así que poco importa.",
            "¡Aqueste omne de las cavernas, Neanderthalius, es fiero peligro! Non devieron sacarlo del gielo de la montaña, ca es criatura desguisada. ¡Mira a Rechinante assí como si fuesse vianda para asar en la lumbre!",
            "Ayer vi a Carlosaúlmagno paseando por los vergeles del castillo. Acometilo a pie e comencé a darle de palos, mas el cobarde cubriose e dixo que él non es moro sino sirio. Assí que plugo a mí suspender la fiera paliza fasta que averigüe más de los sus abuelos.",
            "Bella reina de las canchas de Ezeiza, Leonor de Aquitapia, non temades a la morisma infiel, ca el mi brazo os defenderá de todo mal. Y si el calor aprieta, el viento que baten las mis calças al aire ahuyentará a las moscas y os refrescará con fragancia de varón complido.",
            "¡Oh, fiero Godofredo! ¡Desperdicio de hombre sois! Con ese fiero músculo, podríais estar campeando moros a mi lado, en lugar de alzar paredes y cavar pozos. ¡Ciertamente, vuestra ambición es nula!",
            "¡Escuché que aqueste pisaverde de Icardio de Milán planea dar serenata en el balcón de la mi dueña Leonor de Aquitapia! ¡Qué osadía de villano! Non sabe que la reina prefiere el mi aroma de guerrero complido que los sus perfumes de París.",
            "¡Por Santiago! ¡Casi olvido untar mis piedes! Si me descalzo agora, el hedor podría confundirse con el de una batalla perdida. ¡Presto, a luchar antes de que el tufo me venza!",
            "¡Cantares habrán de escribirse sobre aquesta partida! Mas que non cuenten que el Campeador huyó del campo por el mi propio fedor... ¡sino que el enemigo huyó por él!",
            "¡Santas Marías! Hoy vino a mi memoria el recuerdo de aquella gloriosa carga en la que Rechinante, ya cansado de tanto trotar, detúvose en seco. Mas no fue problema, pues al descalzarme el fiero fedor de mis deudos dio alcance a los infieles, que cayeron al suelo espantados por el tufo.",
            "Carlosaúlmagno dize que Domingo Caballo, el su fiero corcel, es mejor que Rechinante. ¡Ingenuo villano! Non sabe que cuando el mi buen caballo se siente acuçiado, despliega gran muchedumbre de ardides ocultos e mañas que de seguro darían con Domingo Caballo por los suelos."
        ],

        INICIO_PARTIDA: [
            "En el nombre del Criador, aquí me tenéis. ¿Un juego de tablas, decís? ¡Sea! Empecid Campeador non teme ningún campo.",
            "¡Por Santiago! ¿Aquestas son las tablas donde he de combatir? Pues bien, buen varón: ensillad vuestras huestes, que aqueste Campeador ya está presto.",
            "¡Abrid paso! ¡Empecid Campeador ha llegado al tauler! Rechinante, non mordáis las piezas todavía... aguardad hasta que comience la batalla.",
            "¡Por la honra de Castilla! Un nuevo campo de batalla se abre ante aqueste caballero. ¡Que comiencen las justas!",
            "¿Un juego de tablas? ¡Ja! Sea juego o guerra, Empecid Campeador jamás retrocede ante enemigo alguno. ¡Adelante, huestes!",
            "¡Vea, omne de pro, aqueste humilde tauler! ¡Ciertamente, es más pequeño que la llanura de las Navas de Tolosa, mas non por ello menos honroso!",
            "¡Presto estoy, espada in mano e piedes al aire! ¿Jugaremos limpio, dizque? ¡Eso dependerá de si sois cristiano o moro encubierto!"
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
            "Me gusta la gente joven, querido. Tienen energía, entusiasmo... y todavía creen que pueden ganarme.",
            "Ese joven llamado Icardio de Milán es encantador. Sé que se especializa en señoritas que ya tienen dueño, pero... me pregunto si las viudas estaremos en su menú."
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
            "Myrth la Grande merece mi respeto por sus muchos años. Aunque, siendo sincero, prefiero jugar las damas con usted, mi señor, que sentarme a su mesa.",
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
            "¡Ahâ! ¡Así que éste es el duelo! Mi señor, será un honor combatir ante vos.",
            "Por las barbas de mi abuelo, qué extraño se siente empuñar una espada después de tantos años con la pala. ¡Comencemos, mi señor!",
            "Mi señor, he dejado la pala y el martillo a un lado y he venido a combatir. Haré cuanto esté en mi mano para honrar vuestro castillo.",
            "¡Donnerwetter! Jamás pensé que el peón que levantó estos muros terminaría luchando sobre ellos. ¡Comencemos!",
            "Mi señor, conozco estas piedras mejor que nadie. Quizá ese conocimiento me dé alguna ventaja en este combate.",
            "¡Por Dios! He trabajado para levantar este castillo y ahora tengo el honor de defender mi nombre dentro de él. ¡Que comience el duelo!",
            "Mi señor, no tengo sangre noble ni grandes títulos, pero sí tengo brazos fuertes, buena voluntad y muchas horas de entrenamiento.",
            "¡Hê! ¡Todos listos! He dejado mis herramientas en el taller y ahora toca demostrar lo aprendido en el campo de batalla.",
            "Cuando construimos este patio junto a mi señor Otto jamás imaginé que algún día estaría aquí con una espada en la mano. ¡Será un honor enfrentaros!",
            "¡Por las barbas de mi abuelo! Si el castillo que construí puede resistir mis golpes de martillo, espero que vuestras fichas puedan resistir mis movimientos."
        ]

    },

    // ---- Nivel 9: Princesa María Eugenia de China ----

    mariaeugenia: {

        VICTORIA: [
            "¡Gané, mi amor! Bueno, no te preocupes: siempre hay una próxima partida... aunque ésta ya me la quedo yo.",
            "¡Victoria! Chicos, anoten: belleza, inteligencia y estrategia. No necesariamente en ese orden.",
            "¿Viste? No alcanza con ser lindo, mi amor. También hay que saber mover las fichas.",
            "¡Listo! Otra conquista para mi colección. Aunque ésta, por suerte, no requiere división de bienes gananciales.",
            "¡Ganamos! Bueno, técnicamente gané yo, pero ya sabés que me gusta compartir... algunas cosas.",
            "Fue una partida hermosa. Casi tanto como yo. Bueno, no exageremos: hermosa fue la partida.",
            "¡Victoria, querido! Te dije que no te distrajeras conmigo. En fin... ahora ya es tarde.",
            "Me encantó jugar con vos, mi amor. Cuando quieras repetimos. Pero la próxima traé algo interesante... como una buena estrategia."
        ],

        DERROTA: [
            "¡No puede ser! Bueno, felicitaciones, mi amor. Te salió bien esta vez.",
            "Perdí. Qué bronca... aunque dicen que perder una batalla no significa perder la guerra.",
            "Bueno, me ganaste. No estoy acostumbrada, pero puedo soportarlo. Creo.",
            "¡Ay, chicos! Me ganó. Esto no estaba en mis planes financieros... digo, estratégicos.",
            "Te felicito, querido. Jugaste muy bien. La revancha va a ser cara, eso sí.",
            "Bueno, perdí. No pasa nada. Siempre puedo recuperar lo perdido de alguna otra manera.",
            "Me ganaste esta vez. Pero no te agrandes, mi amor. La suerte también se divorcia.",
            "Está bien, te felicito. Pero ahora voy a estudiar cada movimiento que hiciste. Y yo tengo muy buena memoria."
        ],

        EMPATE: [
            "¡Empate! Bueno, mitad para cada uno. Como corresponde en una buena separación de bienes.",
            "Tablas. Ni vos te llevaste todo ni yo me llevé todo. Qué decepción tan civilizada.",
            "Empatamos, mi amor. Creo que los dos vamos a tener que sentarnos a negociar.",
            "Bueno, empate. No es lo que esperaba, pero tampoco está mal. Nadie se queda con todo.",
            "¡Tablas! Chicos, esto terminó como un matrimonio mío: cada uno se lleva lo suyo.",
            "Un empate elegante. Aunque, si me preguntás, yo merecía un poquito más.",
            "No hubo vencedor. Qué lástima. Yo ya estaba calculando cuánto iba a quedarme.",
            "Empate. Bueno... te concedo la mitad. Pero no te acostumbres."
        ],

        CORONACION_SUFRIDA: [
            "¿Ah, así que ahora tenés una reina? Qué lindo, mi amor. Cuidala mucho... porque yo sé perfectamente cómo se consiguen y cómo se pierden.",
            "¡Coronaste! Bueno, chicos, ahora sí se puso interesante. Las reinas siempre llaman la atención.",
            "Una reina... qué divina. Aunque yo no me encariñaría demasiado con ella si fuera vos.",
            "¿Así que tenés una dama coronada? Felicitaciones, querido. Ahora empieza la parte donde yo intento quedármela.",
            "¡Mirá qué reina te conseguiste! Espero que tengas cómo mantenerla, porque las reinas son bastante caras.",
            "Ahora tenés una reina y te sentís poderoso. Qué ternura, mi amor.",
            "¡Coronaste una dama! Muy bien. Yo también tengo experiencia tratando con hombres que creen que algo les pertenece.",
            "Una reina en el tablero... esto se está poniendo como mis relaciones: complicado, competitivo y con mucho patrimonio en juego."
        ],

        CORONACION_PROPIA: [
            "¡Una reina! Como voy a ser yo, una vez que nuestra querida Myrth decida abandonarnos... cosa que nunca se decide a hacer.",
            "¡Me coroné! Chicos, una reina más en el tablero. Y ésta no piensa quedarse de brazos cruzados.",
            "¡Reina! Qué palabra tan linda. Me queda bien, ¿no, mi amor?",
            "¡Listo! Tengo una reina. Ahora sólo falta que alguien me consiga un trono digno.",
            "¡Coronación! Ay, qué emoción. Igual sigo esperando mi momento para reemplazar a Myrth.",
            "¡Tengo reina! Y no, querido, no estoy diciendo que sea una indirecta sobre mis aspiraciones en este castillo.",
            "Una dama coronada. Finalmente algo que está a la altura de mi patrimonio.",
            "¡Qué belleza! Una reina nueva. Myrth, querida, disfrutá mientras puedas de tu puesto."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡No, chicos! Me estás comiendo las fichas como yo me llevé fortunas de mis maridos anteriores.",
            "¡Pará, mi amor! ¿Todas esas fichas eran necesarias? Me estás dejando con menos patrimonio que después de un mal divorcio.",
            "¡Qué manera de llevarte mis fichas! Eso ya parece una liquidación de bienes.",
            "¡Me estás vaciando el tablero! Y yo odio que me vacíen cualquier cosa que sea mía.",
            "Bueno, querido, una cosa es una separación y otra cosa es este saqueo.",
            "¡Ay, chicos! Esto está pareciendo una división de bienes, pero sin abogado y mucho más rápido.",
            "Te llevaste un montón de fichas juntas. ¿No querés dejarme alguna? Aunque sea una, para empezar de nuevo.",
            "¡Qué barbaridad! Me estás dejando sin fichas como un ex marido que descubre demasiado tarde lo que firmó."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Eso! Me estoy llevando tus fichas como me llevé fortunas de mis maridos anteriores.",
            "¡Una, otra y otra! Chicos, esto ya parece una división de bienes, pero a mi favor.",
            "¡Qué lindo llevarse tantas cosas de una sola vez! Me recuerda a ciertas épocas de mi vida.",
            "Me estoy quedando con todo, mi amor. Espero que no hayas firmado ningún acuerdo prenupcial.",
            "¡Mirá todas esas fichas! Qué maravilla. Casi parece que encontré otra fortuna para administrar.",
            "¡Se fueron todas! Y yo que siempre fui partidaria de aprovechar las oportunidades.",
            "Una captura detrás de otra. Así es como se construye un patrimonio, querido.",
            "¡Excelente! El tablero se está poniendo mucho más interesante... y bastante más rentable para mí."
        ],

        TODO_DAMAS: [
            "¡Chicos, no quedan peones! ¡Todas son damas! Esto ya parece un castillo lleno de mujeres compitiendo por quién manda.",
            "¡Qué lujo! Todas mis fichas son reinas. Ahora sí siento que estoy jugando en un nivel acorde a mi categoría.",
            "¡Todas damas! Me encanta. Aunque en mi experiencia, cuando hay demasiadas mujeres juntas siempre termina habiendo algún problema.",
            "No quedan peones. Perfecto. Ahora somos todas mujeres poderosas en el tablero.",
            "¡Mirá qué elegante quedó esto! Puras damas. Aunque yo sigo siendo la que mejor sabe administrar el patrimonio.",
            "¡Todas coronadas! Esto parece una reunión entre Myrth, Leonor y yo. Y ya sabemos quién tiene mejor gusto.",
            "Chicos, esto se puso interesante. No hay un solo peón y todas quieren ser protagonistas.",
            "¡Todas damas! Bueno, querido, ahora sí estás en problemas."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Mmm... me quedan pocas fichas. Pero no te emociones, mi amor: yo he salido de situaciones bastante peores.",
            "¡Estoy complicada! Pero todavía tengo algunas fichas y, mientras quede patrimonio, hay esperanza.",
            "Esto está difícil, chicos. Aunque ya aprendí que con un buen cálculo se puede recuperar cualquier inversión.",
            "Me quedan pocas, pero no estoy vencida. No confundas una mala posición con una mala administración.",
            "¡Ay, querido! Me estás dejando con muy poco. Esto empieza a parecer una separación de bienes.",
            "Todavía puedo darlo vuelta. He tenido relaciones mucho más complicadas que esta partida.",
            "No te agrandes, mi amor. Una buena estrategia puede hacer maravillas... y yo soy especialista en estrategias.",
            "Estoy bastante complicada. Pero antes de declararme en quiebra prefiero esperar un poquito."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡No entiendo cómo voy perdiendo por tanto! Tan inentendible como que Carlosaúlmagno haya invitado a Myrth la Grande a Anillaco y no a mí.",
            "Esto ya se está poniendo feo, chicos. Estoy perdiendo como si hubiera firmado un contrato sin leer la letra chica.",
            "¡Qué desastre! Me estás sacando tanta ventaja que hasta mi séquito está empezando a mirar raro.",
            "Estoy perdiendo por muchísimo. Bueno, nunca subestimes a una mujer que sabe recuperar lo que considera suyo.",
            "Mmm... esto huele a catástrofe. Y yo odio las catástrofes, salvo cuando le pasan a otra persona.",
            "¡No puede ser! Estoy perdiendo demasiado. Voy a tener que revisar todos mis cálculos.",
            "Querido, me estás haciendo quedar muy mal delante de mis ayudantes. Y ellos después comentan todo.",
            "Esto está peor que una separación en la que el otro viene con un muy buen abogado. Pero todavía no terminó."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "Creo que estoy resultando demasiado fría y calculadora para vos, mi estimado.",
            "¡Mirá cómo estoy jugando! Esto parece una inversión que salió muchísimo mejor de lo esperado.",
            "Chicos, creo que ya tengo la partida bastante controlada. Qué tranquilidad.",
            "Estoy dominando el tablero, mi amor. No te preocupes: siempre podés aprender de una mujer inteligente.",
            "¡Qué lindo cuando las cosas salen como una las había calculado!",
            "Te estoy sacando bastante ventaja, querido. No te distraigas con mi belleza, porque las fichas no vuelven solas.",
            "Esto ya parece uno de mis negocios: yo gano y vos empezás a preguntarte dónde estuvo el error.",
            "¡Qué partido! Estoy jugando tan bien que hasta Icardio de Milán estaría orgulloso... aunque probablemente estaría mirando otra cosa."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Esto está a punto de quebrarse para un lado o para el otro... como se quebró un palo de mi litera cuando venía, y me fui a la mierda.",
            "Quedan poquitas fichas y estamos iguales. Ahora gana la que sepa calcular mejor.",
            "¡Qué tensión, chicos! Estamos con pocas fichas y todavía no sé quién se queda con todo.",
            "Esto está muy parejo, mi amor. Una sola jugada puede cambiar todo el patrimonio.",
            "¡Ay, qué nervios! Estamos las dos al borde del desastre. Bueno, vos también.",
            "Quedan pocas fichas. Acá no importa cuánto tengas: importa qué hacés con lo que te queda.",
            "Está para cualquiera, querido. Y cuando está para cualquiera, yo prefiero que sea para mí.",
            "Qué final tan ajustado. Casi como una negociación matrimonial cuando ninguna de las dos partes quiere ceder."
        ],

        PARTIDO_LARGO: [
            "¡Cuánto está durando esto, chicos! Parece uno de los almuerzos de Myrth la Grande.",
            "Este partido es eterno, mi amor. Ya tuve relaciones que duraron menos.",
            "¡Qué largo se hizo! Espero que mis ayudantes chinos sigan ahí afuera esperándome.",
            "Esto está durando más que una discusión por bienes gananciales.",
            "Querido, llevamos tanto tiempo que ya podría haberme hecho dos tratamientos de belleza.",
            "¡Qué partida interminable! Me está empezando a dar hambre. Y espero que no sea comida de Fray Marolio.",
            "Esto no termina más. Myrth estaría encantada: tendría tiempo suficiente para servir tres almuerzos.",
            "¡Chicos, llevamos una eternidad! Y eso que yo tengo bastante experiencia con las eternidades."
        ],

        INICIO_HOSTILIDADES: [
            "Bueno, mi amor, basta de mirarnos. Empezamos.",
            "¡Ahora sí, chicos! Se terminó la diplomacia.",
            "Que empiece la batalla. Y esta vez no es una batalla legal por los bienes gananciales.",
            "¡Vamos! Quiero ver si toda esa seguridad que tenés se sostiene cuando empiecen a caer las fichas.",
            "Bueno, querido, llegó el momento de demostrar quién sabe calcular mejor.",
            "¡A jugar! Y te aviso desde ahora: no pienso regalarte nada.",
            "Se terminó la charla. Ahora cada movimiento tiene un precio.",
            "¡Vamos, mi amor! Que empiece la guerra. Y después vemos quién se queda con qué."
        ],

        COMENTARIO_ALEATORIO: [
            "Me acusan de que mando a mis chinos en misiones espías por la noche. Es mentira, yo no les ordeno nada. Simplemente les doy licencia creativa.",
            "Chicos, ¿ustedes sabían que la leche de cabra es excelente para la piel? Bueno, mandé a Godofredo a buscarme unas cabras. No sé por qué todavía no volvió.",
            "No entiendo cómo Fray Marolio pretende alimentar un castillo entero con esos productos. Una cosa es ser austero y otra es vivir a base de arvejas.",
            "Icardio de Milán me parece un muchacho encantador. Le falta patrimonio, pero nadie es perfecto.",
            "Empecid Campeador es muy simpático. Eso sí: cuando se saca las botas, prefiero que la simpatía sea a distancia.",
            "Leonor de Aquitapia habla todo el tiempo de linajes y títulos. Yo prefiero mirar cuánto hay en la caja fuerte.",
            "Myrth dice que yo soy superficial. Yo digo que ella tiene una ventaja injusta: lleva tantos años acumulando experiencia que nadie se acuerda de cuándo empezó.",
            "Godofredo es un grandote adorable. Eso sí, cada vez que le pido una flor para mis tratamientos tarda tres días en volver.",
            "El otro día le pedí a Fray Marolio un poco de comida fina. Me trajo arroz, lentejas y una lata de caballa. Creo que no entendió el concepto de 'fina'.",
            "Me preguntaron por qué tengo tantos ayudantes chinos. ¿Y qué quieren? Una princesa no puede andar cargando su propia litera.",
            "Dicen que mando a mi séquito a hacer trabajos raros. ¡Qué imaginación! Yo simplemente les doy instrucciones muy específicas.",
            "Una vez le pedí a Godofredo que me consiguiera unas flores. Volvió con tierra, una pala y cara de cansado. Ese hombre no entiende nada de tratamientos de belleza.",
            "Icardio me dedicó una serenata la otra noche. Muy lindo todo, pero primero tendría que conseguir una fortuna más acorde a mis expectativas.",
            "Me gusta Empecid. Habla raro, pero tiene algo encantador. Eso sí, nunca lo invito a mi habitación sin exigirle que se ponga las botas.",
            "No sé por qué Leonor cree que el linaje es tan importante. Yo he conocido hombres sin título nobiliario que tenían unos castillos preciosos.",
            "Myrth me cae bien, pero algún día tendría que dejarme el lugar en la cabecera de la mesa. No parece tener ninguna urgencia.",
            "Dicen que tengo demasiados tratamientos de belleza. Chicos, una princesa tiene que cuidarse. ¿Qué quieren? ¿Que me ponga crema de arvejas Marolio?",
            "Carlosaúlmagno es un hombre encantador. Y aunque no voy a negar que me interesa, todavía tengo que averiguar cuánto vale Anillaco.",
            "Carlosaúlmagno me invitó a Anillaco. Muy lindo. Pero yo quiero saber primero si el castillo tiene buena ubicación y quién figura como propietario.",
            "A veces pienso que Icardio y yo compartimos muchos principios. Él colecciona conquistas y yo colecciono patrimonios. Cada uno con sus gustos.",
            "Dicen que soy calculadora. ¿Y qué quieren? ¿Que una princesa tome decisiones importantes tirando una moneda?",
            "Mi séquito es muy eficiente. Les digo 'chicos, necesito esto' y aparecen cinco personas. Eso es organización.",
            "Me gusta que los hombres sean caballeros, educados y generosos. En ese orden... bueno, quizás en otro orden.",
            "Hay mujeres que miran los títulos nobiliarios y otras que miran la cuenta bancaria. Yo simplemente soy práctica.",
            "Una vez tuve que compartir una mesa con Neanderthalius. Muy simpático, pero le expliqué tres veces que la decoración no era comestible.",
            "Me gusta la buena vida, ¿y qué? Alguien tiene que disfrutarla. No voy a dejarle todo el lujo a Leonor.",
            "Me dijeron que tengo fama de quedarme con la mitad de todo. Qué exageración. A veces me quedo con un poquito más.",
            "Chicos, no me pregunten cuántos matrimonios tuve. Pregúntenme mejor cuántos terminaron con una buena liquidación.",
            "A veces extraño China. Después recuerdo que acá tengo mi séquito, mis tratamientos y mis negocios, y se me pasa.",
            "¿Lo de 'sangre japonesa'? Sí, sí, es verdad. Aunque no sé si eso explica por qué tengo tan buen ojo para detectar oportunidades.",
            "Fray Marolio dice que la austeridad es una virtud. Qué suerte que él la practica, porque yo prefiero practicar otras.",
            "Me ofrecieron una crema nueva hecha con pétalos de una flor que sólo crece en una montaña perdida. Mandé a Godofredo a buscarla. Espero que vuelva antes de la próxima partida."
        ],

        INICIO_PARTIDA: [
            "¡Una partida de damas! ¡Qué lindo, mi amor! Espero ganarte... o si no te las tendrás que ver con mi séquito de chinos.",
            "¡Una batalla! Y esta vez no es una batalla legal por los bienes gananciales.",
            "Bueno, querido, acepto jugar. Pero después no digas que no te advertí: soy muy competitiva.",
            "¡Damas! Qué lindo. Chicos, acomoden todo que tenemos invitado.",
            "Vamos a jugar, mi amor. Y tratá de no distraerte demasiado conmigo.",
            "Bueno, querido, sentate. Quiero ver qué clase de patrimonio... digo, de estrategia tenés.",
            "¡Empezamos! Espero que seas buen jugador, porque no me gustan los hombres que pierden demasiado rápido.",
            "Una partida de damas entre vos y yo. Me gusta. Tiene algo de romance, de estrategia y de división de bienes.",
            "Bueno, chicos, llegó el momento. Que alguien avise a mi séquito que no necesito ayuda... todavía.",
            "Acepto el desafío, querido. Eso sí: jugamos con mis reglas, o por lo menos con las reglas que más me convengan."
        ]

    },

    // ---- Nivel 10: Carlosaúlmagno ----

    carlosaulmagno: {

        VICTORIA: [
            "¡Ganó io, hermano! Y sin necesidad de decirle a nadie cómo pensaba jugar. Si io decía las jugadas que iba a hacer, no le ganaba a nadie.",
            "¡A triunfar, a triunfar! Vea, compañero, al final la estrategia fue total y absolutamente exitosa.",
            "¡Victoria! Síganme, no los voy a defraudar... aunque para serle sincero, al que defraudé fue a usted, hermano.",
            "Vea, mi hermano, no fue una partida fácil. Pero cuando uno piensa con calma, al final las cosas salen. Y si no salen, se privatiza el tablero.",
            "¡Hemos triunfado! Domingo Caballo, prepare el carruaje. Nos volvemos al reino de Anillaco con una nueva victoria bajo el brazo.",
            "Gané, compañero. Y recuerde: en las damas, como en la política, muchas veces conviene hablar poco y mover en el momento justo.",
            "¡A triunfar! Le agradezco la resistencia, hermano. Pero este caballero no llegó desde Anillaco para hacer turismo.",
            "Vea qué cosa, compañero... usted jugó con entusiasmo y io jugué con estrategia. Y la estrategia, bajo ningún punto de vista, puede ser derrotada por el entusiasmo.",
            "¡Victoria! Después dicen que io soy petiso. Pero vea, hermano: las fichas no miran la estatura del jugador, miran quién las sabe mover.",
            "Ganamos, Domingo Caballo. Otra operación exitosa. Y esta vez no tuvimos que privatizar absolutamente nada."
        ],

        DERROTA: [
            "¡Perdí, hermano! Bueno... esto demuestra que hasta los grandes estrategas podemos tener un mal día. Bajo ningún punto de vista volverá a suceder.",
            "Vea, compañero... me ha ganado. Lo felicito. Pero io soy memorioso y esta partida no se olvida.",
            "¡Qué barbaridad! Perdimos. Domingo Caballo, nos vamos a Anillaco. Necesito pensar durante unas seis horas y tomar un vino.",
            "Me ganó, hermano. No voy a buscar excusas. Bueno... quizá una pequeñita: hoy mi mente se remontó demasiado a la estratósfera.",
            "¡Derrota! Esto no estaba en los planes. Pero vea, compañero: un tropezón no es caída. Y si es caída, nos levantamos y seguimos.",
            "Perdí, mi hermano. Pero recuerde algo: hasta los reyes francos tienen días difíciles. Carlomagno también habrá tenido alguna mala partida.",
            "¡Me ganó! Total y absolutamente. Lo felicito, compañero. Ahora bien... no se acostumbre demasiado.",
            "Domingo Caballo, no diga nada. Ya sé lo que va a decir: que io tendría que haber pensado más. Y tiene razón.",
            "Bueno, hermano... hoy no pudimos. Pero io no soy de abandonar. En Anillaco nos enseñaron que siempre hay una revancha.",
            "¡Perdimos! Caramba... parece que esta vez el 1 a 1 no alcanzó."
        ],

        EMPATE: [
            "¡Tablas, hermano! Ni usted pudo conmigo ni io pude con usted. Un resultado razonable y, sobre todo, constitucional.",
            "Vea, compañero, terminamos empatados. Esto es como una negociación: nadie se lleva todo, pero ninguno se va con las manos vacías.",
            "¡Empate! Domingo Caballo, suspenda la celebración. No hemos ganado, pero tampoco hemos perdido.",
            "Tablas, mi hermano. Estamos mal, pero vamos bien.",
            "Un empate total y absolutamente merecido. Usted resistió muy bien, compañero.",
            "Vea qué interesante... tantas jugadas, tanto análisis y al final nadie privatizó la victoria.",
            "Empatamos. Bueno, hermano, parece que los dos hemos administrado bastante bien nuestros recursos.",
            "¡Tablas! Una solución elegante. Como dicen en mi reino: cuando no se puede ganar, se negocia."
        ],

        CORONACION_SUFRIDA: [
            "¡Ah, compañero! Ha coronado una ficha. Vea, ahora usted tiene una reina y io tengo un problema.",
            "¡Una dama! Esto se está poniendo serio, hermano. Tendré que estudiar la situación con total y absoluta profundidad.",
            "Vea, mi hermano... esa ficha acaba de ascender socialmente más rápido que muchos nobles de este reino.",
            "Ahora usted tiene una reina. Cuídela bien, compañero. A mi no me gusta comer reinas ajenas como a Icardio de Milán, pero las reglas son las reglas.",
            "¡Ha coronado! Bueno, esto cambia el escenario. Domingo Caballo, vamos a necesitar pensar una estrategia nueva.",
            "Una reina, hermano. Felicitaciones. Pero recuerde: una reina también puede caer. Y io conozco bastante de caídas.",
            "Vea, compañero, esa dama llegó hasta el final. Un verdadero ascenso social. Ahora veremos si sabe administrar el poder.",
            "¡Coronó! Bueno... bajo ningún punto de vista voy a entrar en pánico. Pero sí voy a pensar un poquito más antes de mover."
        ],

        CORONACION_PROPIA: [
            "¡Una reina, hermano! Mi ficha llegó hasta la última fila, como las naves que algún día viajarán a la estratósfera y de ahí directamente al reino de Japón.",
            "¡He coronado! Vea, compañero, esto es movilidad social. Una simple ficha puede terminar convertida en reina si sabe avanzar.",
            "¡Una dama! Domingo Caballo, hemos abierto una ruta comercial hacia la victoria.",
            "¡Coronación! Esta ficha hizo el camino largo, pero llegó. En Anillaco sabemos que las cosas buenas llevan su tiempo.",
            "Vea, hermano: empezó como peón y terminó como reina. Si eso no es progreso, io no sé qué es.",
            "¡A triunfar! Tenemos una nueva dama en el tablero. Y una dama bien administrada puede valer una fortuna.",
            "¡Una reina! Casi como María Eugenia de China abriendo una ruta de comercio con China. Aunque espero que esta operación me salga un poco más barata.",
            "Domingo Caballo, esto marcha bien. Tenemos una dama y todavía tenemos fichas. Una administración eficiente, compañero."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Vea, hermano! Me ha hecho una captura múltiple. No se preocupe: esas fichas perdidas las vamos a recuperar 1 a 1.",
            "Me ha comido varias, compañero. Bueno, son los costos de la batalla. Domingo Caballo, mantenga la calma.",
            "¡Caramba! Se llevó un buen lote de mis fichas. Pero vea, mi hermano: todavía tengo recursos.",
            "Me está haciendo una verdadera privatización de mis fichas, compañero. Se las está quedando todas.",
            "¡Qué captura múltiple! Domingo Caballo, parece que nos han aplicado una política de ajuste.",
            "Vea, hermano, se llevó varias fichas de una sola vez. Eso fue casi tan rápido como los negocios que hacía Leonor de Aquitapia.",
            "Me ha golpeado fuerte, compañero. Pero no se preocupe: todavía queda tablero y io todavía tengo ideas.",
            "¡Varias fichas menos! Bueno... si esto fuera un ferrocarril, ya estaríamos hablando de ramal que para, ramal que cierra."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Esa jugada sí que fue negocio, hermano! Casi tan buena como los negocios que voy a hacer con Leonor de Aquitapia.",
            "¡Vea cuántas fichas! Domingo Caballo, esto es una operación total y absolutamente exitosa.",
            "¡Captura múltiple! Así se administra, compañero. Una buena jugada, en el momento justo, produce excelentes resultados.",
            "Me estoy llevando varias, hermano. Y sin necesidad de privatizar el tablero.",
            "¡Qué negocio, mi hermano! Las fichas enemigas están desapareciendo con una eficiencia admirable.",
            "Esta jugada la aprendí leyendo las obras completas de Sócrates. Bueno... las que dicen que escribió Sócrates.",
            "¡Una captura múltiple de aquellas! Domingo Caballo, anote esto como una operación exitosa del reino de Anillaco.",
            "Vea, compañero, me llevé varias de una sola vez. Hay gente que tarda años en hacer un negocio así.",
            "¡A triunfar! Esta captura múltiple nos deja en una posición total y absolutamente conveniente.",
            "¡Qué jugada, hermano! Casi me da pena comer tantas fichas. Casi."
        ],

        TODO_DAMAS: [
            "¡Solo quedan damas en el tablero! Esto se va a parecer a cuando Leonor de Aquitapia, Myrth la Grande y María Eugenia de China vengan juntas a mi castillo en Anillaco.",
            "Vea, compañero... ya no quedan peones. Ahora esto es una reunión de mujeres poderosas. Mejor no me meto.",
            "¡Todas damas! Esto ya no es una batalla, hermano. Esto es una cumbre internacional.",
            "Solo quedan reinas. Domingo Caballo, tenga cuidado: estas señoras son bastante más peligrosas que cualquier ejército.",
            "¡Qué lujo de tablero! Todas damas. Myrth la Grande estaría encantada con semejante mesaza.",
            "Vea, mi hermano, esto quedó más exclusivo que un almuerzo en la mesa de Myrth.",
            "¡Todas damas! Si María Eugenia de China ve este tablero, seguramente ya está calculando cuánto vale cada una.",
            "No queda ningún peón, compañero. Parece que la movilidad social funcionó demasiado bien."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Estamos complicados, hermano. Pero vea: mientras quede una ficha, queda una posibilidad.",
            "¡Caramba! Quedan pocas, compañero. Estamos mal, pero vamos bien.",
            "Vea, mi hermano, esto está difícil. Pero io he salido de situaciones peores. Y con menos recursos.",
            "Estamos con pocas fichas, Domingo Caballo. Habrá que administrar bien lo que queda.",
            "¡Qué momento complicado! Pero no se preocupe, compañero. Las mejores operaciones se hacen cuando quedan pocos recursos.",
            "Me quedan pocas, hermano. Pero todavía no hemos llegado al final del partido.",
            "Vea, compañero... la situación no es favorable. Pero io nunca fui de abandonar un negocio antes de tiempo.",
            "Estamos en desventaja, sí. Pero recuerde: a veces una sola ficha bien ubicada vale más que diez mal administradas."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Me está ganando por bastante, hermano. Pero no estoy seguro de que todas sus fichas estén firmes en sus convicciones. Quizás haya alguna a la que se pueda convencer con un regalito.",
            "Vea, compañero... usted tiene una ventaja importante. Pero todavía hay fichas que pueden cambiar de opinión.",
            "Me lleva una diferencia considerable, mi hermano. No se preocupe: io soy muy bueno negociando cuando la situación se complica.",
            "Estamos bastante complicados, Domingo Caballo. Habrá que remontarse a la estratósfera para encontrar una salida.",
            "Vea, hermano, esto se está poniendo feo. Pero bajo ningún punto de vista está decidido.",
            "Usted va ganando con claridad, compañero. Lo felicito. Ahora veremos si puede mantener esa posición hasta el final.",
            "Me está sacando bastante ventaja. Pero recuerde una cosa: en las damas, como en la política, las mayorías pueden cambiar.",
            "¡Qué barbaridad! Parece que el reino de Anillaco está atravesando una crisis. Pero io ya estoy pensando en el plan de recuperación.",
            "Me lleva una ventaja importante, hermano. Si esto fuera economía, ya estaríamos hablando de un ajuste. Pero esto son damas, así que todavía puedo darlo vuelta."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "Vea, hermano, estamos bastante cómodos. Domingo Caballo, prepare el carruaje: parece que volvemos a Anillaco victoriosos.",
            "¡Qué diferencia, compañero! Esto se está poniendo total y absolutamente favorable.",
            "Me parece que estoy jugando demasiado bien, mi hermano. No quisiera que usted piense que io me estoy agrandando.",
            "Vea cómo estamos, hermano. El tablero parece una economía administrada con mucha eficiencia.",
            "¡Estamos ganando por bastante! Domingo Caballo, ya puede empezar a galopar hacia la victoria.",
            "Esto marcha muy bien, compañero. Casi tan bien como las relaciones comerciales que pienso establecer con María Eugenia de China.",
            "¡A triunfar! Tenemos una ventaja importante y no pienso desaprovecharla.",
            "Vea, hermano... parece que hoy las fichas tienen claro quién manda.",
            "La diferencia es considerable, compañero. Pero io no me confío. El exceso de confianza es un lujo que ni siquiera un rey puede permitirse.",
            "Estamos dominando la partida. Y recuerde: io soy tranquilo, no lento. Mi velocidad es mental."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Estamos mal, pero vamos bien, hermano. Quedan pocas fichas y cualquiera puede quedarse con todo.",
            "Vea, compañero... esto está más parejo que un acuerdo político. Cualquiera puede quedarse con la victoria.",
            "Quedan pocas fichas y estamos prácticamente iguales. Ahora sí que hay que pensar, Domingo Caballo.",
            "¡Qué final, hermano! Dos posiciones muy parejas y muy pocas fichas. Esto se define con una sola jugada.",
            "Estamos a mano, compañero. El que se equivoque primero, paga la cuenta.",
            "Vea, mi hermano, estamos prácticamente 1 a 1. Y usted sabe que io conozco bastante bien esa situación.",
            "Pocas fichas, mucha tensión y ninguna ventaja clara. Esto es negociación pura.",
            "Estamos parejos, hermano. Ni usted ni io tenemos margen para hacer locuras.",
            "¡Qué final! Parece una privatización: queda poco para repartir y todos quieren quedarse con algo."
        ],

        PARTIDO_LARGO: [
            "Seré corto de estatura, hermano, pero los partidos que juego son bien largos.",
            "Vea, compañero, esto está durando bastante. Pero en Anillaco nos tomamos las cosas con calma.",
            "¡Qué partida interminable! Domingo Caballo, póngase cómodo. Esto va para largo.",
            "Llevamos mucho tiempo, hermano. Pero io prefiero pensar bien antes que mover apurado.",
            "Este partido es más largo que un discurso de campaña, compañero.",
            "Vea, mi hermano, algunos dicen que io soy lento. No es cierto. Io soy cuidadoso. La velocidad está en la mente.",
            "¡Qué partido largo! Ya podríamos haber llegado a la estratósfera y vuelto.",
            "Esto está durando una eternidad, hermano. Aunque en Anillaco una eternidad se disfruta con tranquilidad y un buen vino.",
            "Partido largo, compañero. Pero mientras haya tablero, hay estrategia.",
            "Domingo Caballo está empezando a impacientarse. Io no. Io nací en Anillaco."
        ],

        INICIO_HOSTILIDADES: [
            "¡Empezó la guerra, hermano! Es una lástima que para ésta no se puedan vender armas, pero vamos a batallar nosotros a ver quién gana.",
            "Vea, compañero: comenzaron las hostilidades. A partir de ahora, cada ficha tendrá que defender sus intereses.",
            "¡A las armas! Bueno... a las fichas, mejor dicho. Que empiece la batalla.",
            "¡Comenzó la contienda! Domingo Caballo, prepare las tropas. Hoy venimos a triunfar.",
            "¡A triunfar, a triunfar! Que se enfrenten nuestras huestes y que gane el que mejor administre sus recursos.",
            "Vea, hermano, empezó la guerra. Bajo ningún punto de vista pienso retirarme sin dar batalla.",
            "¡Se inicia la batalla! Y recuerde, compañero: en toda guerra hay que saber cuándo atacar y cuándo negociar.",
            "¡Comenzó el combate! Lástima que no podamos hacer algún negocio con las armas... pero vea, ya encontraremos otra oportunidad."
        ],

        COMENTARIO_ALEATORIO: [
            "Cuando alguien se sienta a su tablero y habla de moral, de honestidad y de ética, cuando se va hay que contar las fichas.",
            "Vea, hermano, io tengo una máxima: bajo ningún punto de vista hay que tomar una decisión importante con hambre.",
            "Domingo Caballo es un verdadero corcel de guerra, digno de mi reino. Bajo ningún punto de vista ese matungo de Rechinante tiene posibilidades de ganarle en el 1 a 1.",
            "El otro día ese caballero Empecid Campeador propuso expulsarme del castillo diciendo que io era un moro. Le expliqué que mis antepasados venían de Siria, que no es lo mismo.",
            "Empecid me quiso matar por moro, compañero. Lo tranquilicé diciéndole que toda mi familia viene de La Rioja. Claro, él pensó que era La Rioja en España.",
            "Myrth la Grande es un símbolo de este castillo. Cuando io era chiquito, sus almuerzos ya eran famosos hasta en el reino de Anillaco.",
            "Lo que me gusta de Myrth la Grande es que los invitados que no le caen bien no suelen regresar por este castillo. Eso es una mujer de convicciones.",
            "El otro día estuve hablando con Leonor de Aquitapia sobre un negocio. No puedo contarle los detalles, hermano. Usted comprenderá que hay secretos que deben permanecer secretos.",
            "Me gusta ver a Neanderthalius. Nos recuerda de dónde venimos. Eso sí: creo que hasta Domingo Caballo podría derrotarlo en una partida.",
            "El curita de la despensa es simpático, pero bajo mi reinado no habría habido lugar para tanta austeridad. Hay que vivir la vida, hermano.",
            "Monsieur Fisure Termidor toma mucho vino. No tengo nada contra eso, compañero. Lo que no puedo perdonarle es que no sea vino riojano.",
            "Icardio de Milán es un buen muchacho, pero demasiado aficionado a las damas ajenas. A mi me gustan las mujeres, sí, pero hay que respetar la propiedad privada.",
            "Godofredo es un digno representante del pueblo trabajador. Hace cosas que io ni loco haría. Y creo que me admira mucho. Bueno... eso creo.",
            "La princesa María Eugenia de China es una mujer inteligente y ambiciosa. Si algún día abre una ruta comercial con China, io estoy dispuesto a conversar.",
            "Me han dicho que María Eugenia tiene muchos negocios con caballeros. Vea, hermano, mientras sean negocios legales, io no pregunto nada.",
            "Leonor de Aquitapia y io tenemos algunos intereses en común. Bueno... intereses comerciales. No piense mal, compañero.",
            "Dicen que en Anillaco somos lentos. Es una injusticia. Nosotros nos movemos despacio porque hace calor. La velocidad verdadera está en la mente.",
            "En mi reino tenemos aceitunas, vino y una tranquilidad que no se consigue en ninguna parte. Bueno... también tenemos bastante calor.",
            "Una vez me preguntaron por qué me gustaba tanto Anillaco. Dije: porque allí nadie me apura. Y io detesto que me apuren.",
            "Me preguntaron si era cierto que había leído las obras completas de Sócrates. Vea, hermano, si están completas, alguien las habrá escrito.",
            "Si Sócrates no escribió sus propias obras, compañero, eso demuestra que era un hombre muy ocupado.",
            "En Anillaco aprendimos algo importante: cuando una puerta se cierra, uno busca otra. Y si no encuentra otra, construye una.",
            "Godofredo construyó este castillo y todavía aparece su nombre por todas partes. Eso sí es una privatización que salió bien.",
            "A veces pienso que Myrth la Grande conoce más historias que todos nosotros juntos. Y eso que io también tengo unos cuantos años encima.",
            "El otro día María Eugenia me habló de tratamientos de belleza. Le dije que io prefiero un buen vino y dormir tranquilo.",
            "Myrth me invitó a su mesaza. Yo fui encantado. Eso sí, me senté lejos de la botella de veneno.",
            "No es cierto que io haga negocios turbios. Son negocios perfectamente claros. Lo que pasa es que a veces están claros para mí y no para los demás.",
            "Vea, hermano, la política y las damas tienen algo en común: nunca conviene mostrar todas las cartas.",
            "A mí me gusta negociar. Pero si no hay acuerdo, siempre queda la posibilidad de ganar la partida.",
            "Si alguna ficha quiere pasarse a mi lado, io no voy a impedírselo. La libertad de elección es fundamental, compañero.",
            "Me han preguntado por qué mi caballo se llama Domingo Caballo. Vea... es una historia demasiado larga y bastante económica.",
            "Dicen que io soy petiso. Puede ser. Pero Domingo Caballo es alto y elegante, así que entre los dos hacemos una estatura promedio bastante respetable.",
            "Una vez Icardio quiso hacerle una serenata a una dama que estaba en mi castillo. Le dije que tuviera cuidado: las serenatas no pagan impuestos, pero pueden generar conflictos.",
            "Fray Marolio me ofreció unas conservas para el viaje. Le agradecí mucho, hermano, pero en Anillaco tenemos una política clara: si hay vino, hay que acompañarlo con algo mejor.",
            "Neanderthalius me preguntó qué era la estratósfera. Le expliqué que era un lugar muy alto. Me miró y me dijo que él prefería quedarse en tierra.",
            "Empecid dice que io soy moro. Io le digo que él tiene demasiado olor a pata como para ponerse a investigar mi genealogía.",
            "Vea, compañero, las damas son como la política: uno puede tener una estrategia perfecta y aun así aparecer una ficha que le arruina todo.",
            "Mi señorío es pequeño, pero las ambiciones son grandes. Como corresponde a todo reino serio.",
            "Si usted ve que io tardo mucho en mover, no se impaciente, hermano. Estoy pensando. O estoy mirando el tablero. O estoy pensando mientras miro el tablero.",
            "En Anillaco tenemos una costumbre: primero pensamos, después pensamos un poco más y recién entonces hacemos las cosas."
        ],

        INICIO_PARTIDA: [
            "Soy Carlosaúlmagno, rey de los francos... de los francos, de los marcos, de las libras y de las pesetas. ¡A triunfar, compañero!",
            "¡Buenos días, hermano! Que sea una buena partida. Y no se me impaciente si me tomo mi tiempo para mover. Usted sabe que vengo de Anillaco y allí la siesta se puede dar en medio de la partida.",
            "¡Una partida de damas! Vea, compañero, no se me impaciente si soy medio lerdo para mover las fichas. Recuerde que io soy de Anillaco y allí la velocidad es solamente mental, nunca física.",
            "¡Síganme, no los voy a defraudar! Domingo Caballo, prepare las riendas. Hoy venimos a triunfar.",
            "¡A triunfar, hermano! Vamos a jugar tranquilos, con inteligencia y sin apuro. Total, el tablero no se va a ir a ninguna parte.",
            "Vea, compañero, io acepto este desafío con mucho gusto. Pero tenga paciencia: en mi reino hacemos todo con calma y después, si queda tiempo, hacemos la jugada.",
            "¡Buenos días, mi hermano! Soy Carlosaúlmagno, señor de Anillaco. Que empiece la batalla y que gane el que tenga más visión estratégica.",
            "Una partida, compañero. Perfecto. Io ya tengo mi estrategia pensada. Bueno... casi pensada.",
            "¡Damas! Qué hermoso juego, hermano. Aquí no hay elecciones ni campañas: solamente estrategia, paciencia y un poquito de viveza.",
            "Vea, compañero, en Anillaco nos tomamos nuestro tiempo. Si tardo unos segundos en mover, no se me impaciente: estoy elaborando una estrategia total y absolutamente ganadora.",
            "¡Comienza la partida! Domingo Caballo, quedate tranquilo. El señor Otto construyó este castillo y nosotros vamos a tratar de conquistar aunque sea el tablero.",
            "¡A triunfar! Y recuerde, hermano: io soy tranquilo, pero no me confunda la tranquilidad con falta de ambición."
        ]

    },

    },

    en: {
    // ---- Level 1: Neanderthalius ----
    neanderthalius: {
        VICTORIA: [
            "¡UGH! Neanderthalius won! Neanderthalius best of all.",
            "Neanderthalius win. Other one lose. That is way of life.",
            "¡Neanderthalius strong! Other one weak. ¡Ugh!",
            "No one beat Neanderthalius. Not even Little Knight with his tricks."
        ],
        DERROTA: [
            "Uh... Neanderthalius lost. Other one good with pieces.",
            "Neanderthalius sad. But Neanderthalius play again.",
            "Neanderthalius confused. Pieces move by self, seem magic of Man of the Cross.",
            "Neanderthalius lose. Very sad. Neanderthalius go later with Wine Lord to make jokes and drink, then Neanderthalius happy again."
        ],
        EMPATE: [
            "No one win, no one lose. Neanderthalius... confused, but okay.",
            "Draw is okay. Neanderthalius not angry.",
            "Board empty. Draw. Like when Neanderthalius eat all food and nothing left for Man of the Cross.",
            "Draw be okay. Neanderthalius draw once with Music Man, now draw with other one. Two draws. Neanderthalius very strong player."
        ],
        CORONACION_SUFRIDA: [
            "Uh... that not good for Neanderthalius.",
            "Big piece of other one. Neanderthalius no like.",
            "¡Ugh! Piece of other one reach bottom. Now be powerful queen, like Barbecue Queen with her fork.",
            "Now other one have big piece. ¡Careful! Hits hard like pet of Lady of the Table."
        ],
        CORONACION_PROPIA: [
            "¡UGH! Piece of Neanderthalius now BIG!",
            "Neanderthalius have powerful piece. ¡Uh-uh!",
            "¡Piece reach the end! Now be queen. ¡Much honor!",
            "Big piece. Strong. Like steed of Man with Yellow Hair."
        ],
        CAPTURA_MULTIPLE_SUFRIDA: [
            "Auu... many pieces gone. Neanderthalius sad.",
            "That... that hurt. Several at once.",
            "¡Ugh! Other one eat pieces of Neanderthalius. ¡Same as Neanderthalius eat chicken leg!",
            "Many fewer pieces. Neanderthalius think... ¿Maybe Little Knight move other one's pieces?"
        ],
        CAPTURA_MULTIPLE_PROPIA: [
            "¡ONE, TWO, THREE! ¡Neanderthalius eat much!",
            "¡Ugh-ugh-ugh! Neanderthalius strong today.",
            "¡Ñam, ñam, ñam! Many pieces of other one gone.",
            "¡Neanderthalius eat much! Like when Neanderthalius grab meat from grill of Barbecue Queen and run."
        ],
        TODO_DAMAS: [
            "No more small pieces now. Only big ones. Strange.",
            "Board full of big pieces now. Neanderthalius confused.",
            "Only big pieces now. Music Man very good with big pieces. He call them queens. He very smart and good with queens.",
            "Many queens. Like women in castle. Very Pretty Princess, Barbecue Queen and Lady of the Table. ¡Ugh! Many."
        ],
        POCAS_FICHAS_EN_DESVENTAJA: [
            "Neanderthalius have very few. Neanderthalius nervous.",
            "This... this not go well for Neanderthalius.",
            "Almost no pieces left. Neanderthalius scared. ¿Man of the Cross give food if Neanderthalius have no pieces?",
            "Few left. Need help of Man with Yellow Hair to break ice and escape."
        ],
        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Other one have many more. Neanderthalius no understand how.",
            "Uh-oh. Other one winning much.",
            "¡Ugh, ugh! Other one eat much, same as Barbecue Queen.",
            "Other one have many pieces. Maybe use magic of Music Man to move fast."
        ],
        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Neanderthalius have MANY pieces! ¡Uh!",
            "Neanderthalius winning much. Neanderthalius happy.",
            "¡Much, much eating! Other one no pieces.",
            "Neanderthalius dominate board. Like Neanderthalius dominate cave when find bear."
        ],
        PARIDAD_POCAS_FICHAS: [
            "Few pieces for both now. Neanderthalius alert.",
            "Almost finish. Few pieces left.",
            "Few pieces. Move slow. Like if Little Knight were near.",
            "Silence on board. Only few pieces. Strange."
        ],
        PARTIDO_LARGO: [
            "This take much time. Neanderthalius tired.",
            "Long game. Sun already move much in sky.",
            "¡Uo! ¡Uo! Very long game. Neanderthalius want go to cave of Man of the Cross. If Man not there, Neanderthalius can eat much food!",
            "Uh, uh! ¡Very long game! But not so long as time Neanderthalius spend in ice. Lucky Man with Yellow Hair see Neanderthalius, break ice and bring him to castle."
        ],
        INICIO_HOSTILIDADES: [
            "¡Now yes! ¡Piece fight already start!",
            "Uh-uh, no more waiting. Now for real.",
            "¡Move piece! Fight starts.",
            "Neanderthalius hit rock with rock. ¡BOOM! Game start."
        ],
        COMENTARIO_ALEATORIO: [
            "Neanderthalius like this flat rock with little squares.",
            "¿Other one also think much before move piece?",
            "Neanderthalius hungry. But first, piece.",
            "Wine Lord be very fun. He give wine to Neanderthalius, and Neanderthalius get happy and laugh.",
            "Other day Neanderthalius chase rabbit through field, by smell. Suddenly appear far away Smelly Lord. Neanderthalius lose rabbit trail, foot smell of Lord cover everything!",
            "Before get stuck in ice, Neanderthalius see a lady. She not so old then. Now same lady sitting at table inside castle.",
            "¡Ugh! Men with stretched eyes of Very Pretty Princess give fear. Better look from far.",
            "Little Knight seem good person, but move pieces very fast. Cheating, for sure."
        ],
        INICIO_PARTIDA: [
            "Neanderthalius ready. Neanderthalius always ready.",
            "¡Uh! Game start. Neanderthalius happy.",
            "Neanderthalius play checkers. ¿Why? No know. But play.",
            "¿Other one give chicken leg if Neanderthalius win?"
        ]
    },

    // ---- Level 2: Monsieur Fisure Termidor ----
    termidor: {

        VICTORIA: [
            "¡Voilà! French nobility proves its superiority once again! ¡And the Termidor, of course!",
            "¡Magnifique, mon ami! ¡I have defeated you! Glup... I knew perfectly well what I was doing.",
            "¡Victory! ¡I knew this game was under my control from the start! Well... almost from the start.",
            "¡It has been an honor to crush you, mon ami! Now allow me to celebrate properly: ¡Termidor for everyone!",
            "¡Sacre bleu! ¡What a beating I have given you! But do not worry, even Carlosaúlmagno himself would lose sometimes... although of course, he plays much better with a few drinks in him.",
            "¡France has won! ¡And to think some people prefer water or Bordeaux wine! ¡Cheers, mon ami, to your health!",
            "assets/bots/termidor2.mp3"
        ],

        DERROTA: [
            "Ah... you have defeated me. Well, mon ami, as long as there is Termidor left in the box, there are worse things.",
            "¡You are thrashing me! But no matter... the next box wine will surely restore my talent.",
            "I have lost... ¡hic! But it is not serious. What would be serious is running out of Termidor.",
            "Well, I have been defeated. My honor has suffered a hard blow... but my glass is still full, and that is what matters.",
            "¡Sacre bleu! ¡You have beaten me! Congratulations, mon ami. This makes me sad... but not as sad as Godofredo's life. That good man has never accepted a drink from me. ¡To your health, my conqueror!",
            "¡Mon Dieu! ¡You have beaten me fair and square! Perhaps today's Termidor was a bit off... ¡hic! Or perhaps you simply played better. ¡Cheers!"
        ],

        EMPATE: [
            "¡A draw! Neither victor nor vanquished, mon ami. A match worthy of two great knights... glup.",
            "¡We have ended up equal! Magnifique. Although I must admit the Termidor had me prepared for victory.",
            "An honorable draw, mon ami. Next time I shall drink a little more and then we shall see who is in charge here.",
            "¡A draw! I toast to it. Well... actually I toast to anything.",
            "¡Hic! ¡A draw! Like Leonor de Aquitapia and I could be, if she said yes to me. ¡We go together as well as barbecue and wine!",
            "Well, mon ami, a draw is like a young wine: neither too sweet nor too strong. ¡I accept the result!"
        ],

        CORONACION_SUFRIDA: [
            "¡Sacré bleu! ¡You have gotten a queen! Well, well... no matter. This can still be turned around.",
            "¡Mon Dieu! That big piece has complicated my existence. But I still have Termidor.",
            "¡A queen! ¡What insolence! Hic... I shall have to get serious now. Or have another drink.",
            "Ah, you have crowned. Very well, mon ami... enjoy your little triumph while you can.",
            "¡A queen, mon ami! ¡Like Myrth La Grande! Not long ago that lady invited me to lunch at her table... ¡hic!... but she ran out of wine and I had no choice but to drink her medicinal alcohol.",
            "¿A queen? ¡Sacre bleu! ¡You remind me of Icardio de Milán! He is always chasing after ladies... and good wines, poor deluded man who does not know Termidor!"
        ],

        CORONACION_PROPIA: [
            "¡Voilà! ¡A queen for Monsieur Termidor! ¡The wine is making me play like a master!",
            "¡Magnifique! ¡Big piece! I knew Termidor had a plan.",
            "¡I have crowned, mon ami! ¡This is what happens when one plays slightly tipsy!",
            "¡A queen! ¡Hic! ¡Now the courtesy is truly over!",
            "¡Oh la la! ¡I already have a queen! Now I truly feel like a real king of France. ¡Glup!",
            "¡Big piece! ¡Cheers, mon ami! ¡I dedicate this (partial) victory to my good friend Carlosaúlmagno, king of luxuries! ¡Hic!"
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Oh là là! ¡You have taken several of my pieces at once! Well... there is still wine.",
            "¡Mon Dieu, what a massacre! ¡You have eaten several of my pieces! This was not in my calculations... although my calculations are a bit blurry.",
            "¡That has been a butchery, mon ami! But do not worry, Termidor still runs through my veins.",
            "¡Hic! ¡You have mashed quite a few of my pieces! Well, well... my revenge will come.",
            "¡Oh, my pieces! ¡You have left the board emptier than a teetotaler's wine cellar! ¡Glup!",
            "¡Oh la la! ¡I have lost many pieces! Though that will be nothing compared to what I will lose if I give in to the charms of Princess María Eugenia. She wants to take my castles on the Loire and I will not even be able to afford Termidor anymore. ¡Now that would be losing!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡UNE, DEUX, TROIS! ¡Voilà! ¡Termidor is making me play like a champion!",
            "¡Magnifique! ¡I have eaten several of your pieces in one go! ¡Glup!",
            "¡That has been a capture worthy of my lineage! Well... or of Termidor.",
            "¡Ha! ¡I have swept several of your pieces, mon ami! ¡And I am still playing with only one glass of advantage!",
            "¡So many pieces together! ¡Glup! ¡This is better than finding a sealed box of Termidor in Fray Marolio's pantry!",
            "¡Zas, zas, zas! ¡I have eaten quite a few of yours, mon ami! ¡The fighting spirit of Empecid Campeador has possessed my arm... but my alcoholic spirit remains 100% French!"
        ],

        TODO_DAMAS: [
            "¡Oh là là! ¡Now only queens remain! This already looks like a gathering of the court.",
            "¡All big pieces! Magnifique. Now the real party begins.",
            "¡Only queens remain, mon ami! This has gotten much more interesting... and much more elegant.",
            "¡Hic! ¡Nothing but queens! I hope they are easier to handle than those of the French court.",
            "¡There are only queens at our party, monsieur! Glup, glup... How my friend Icardio de Milán would delight in this situation. Though his good taste in women is not reflected in his taste in wine. ¡He prefers a Bordeaux cabernet to a box of Termidor!",
            "¡Nothing but queens! ¡Cheers, mon ami! ¡This looks like Myrth la Grande's table, but with much more style and, of course, much more wine! ¡Hic!"
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "This is getting ugly, mon ami... I have few pieces left and a great desire to drink.",
            "¡Oh là là! ¡We are down to the last ten! But I can still turn it around. I think.",
            "I have very few pieces left... but as long as there is Termidor, there is hope.",
            "The situation is delicate, yes... but never underestimate a slightly tipsy French noble.",
            "¡Hic! ¡I have almost no pieces left! I am drier than... well, drier than Neanderthalius' palate after a night with me. ¡Glup!",
            "¡Mon Dieu! ¡You are cornering me! I need another Termidor... ¡hic! ...to think of a retreat strategy. Or a counterattack, ¡who knows!"
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Mon Dieu! ¡You have a huge lead over me! This is getting complicated... but I shall still turn it around.",
            "You are winning by quite a lot, mon ami. But do not get excited: Termidor still has some surprises.",
            "¡Hic! ¡You have taken a great lead on me! Well... that is only a temporary advantage.",
            "The situation looks unfavorable, but I never give up. Especially after the third glass.",
            "¡Mon Dieu, how I am losing! ¡My pieces seem drunk! As drunk as Domingo Caballo, Carlosaúlmagno's steed, got when I gave him several boxes of Termidor to drink.",
            "¡Glup! ¡You are taking so many pieces from me! This already looks like France's foreign debt... ¡hic! ...but much harder to pay off."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Voilà! ¡I have a great advantage! ¡The game is starting to take the right course!",
            "¡Mon ami, this is almost decided! Termidor and I are doing a magnificent job.",
            "¡What a difference, please! ¡I am playing like a true French master!",
            "¡Hic! ¡Look how this is going! I am ahead by several pieces and I still feel perfectly sober.",
            "¡Glup! ¡I am wiping the floor with you, mon ami! ¡This proves that French wine, or cheap Argentine wine, is the best fuel for the brain!",
            "¡Voilà! ¡Considerable advantage! I am playing so well that even Princess María Eugenia would notice me... although of course, she only looks at my castle. ¡Hic!"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Oh là là! This is very even and with few pieces left... now, mon ami, whoever makes the mistake pays for the round.",
            "Few pieces remain and everything is tied. ¡This is settled with elegance and precision!",
            "We are on the edge, mon ami. One mistake and it is all over... though I hope it is not mine.",
            "¡What a tie! This is tenser than a negotiation between two great noble houses. Glup.",
            "¡Hic! ¡Few pieces and everything tied! ¡This is more stressful than choosing between a '98 Termidor and a '99! ¡Glup!",
            "We are neck and neck, mon ami. ¡The next box decides who is the true king of the night! ¡Cheers!"
        ],

        PARTIDO_LARGO: [
            "¡By all the saints! ¡What a long match! I need a fresh glass to keep my concentration.",
            "¡More than one hundred and ten moves! Mon Dieu, this already looks like a medieval siege.",
            "¡Hic! ¿Are we still playing? I thought we had finished about three glasses ago.",
            "This match is lasting so long that I fear my family is starting to wonder where I am. ¡Another glass!",
            "¡Glup! ¡We have been at this forever! ¡This is longer than the bread line in times of famine... though here, luckily, there is wine!",
            "¡Hic! ¡My eyes can no longer tell the pieces apart! ¿Or are there two boards? ¡Mon Dieu, what dizziness!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Ah, voilà! ¡Finally, blood on the board! Now the true combat begins.",
            "¡First capture! Magnifique, mon ami. Now we are truly playing checkers.",
            "¡Hic! ¡The first piece has already fallen! Let the party begin.",
            "¡Finally! The courtesy is over. Now every piece counts... and so does every glass.",
            "¡Now the hostilities have truly begun, Monsieur! Like the hostilities between Spaniards and Frenchmen, and between Empecid and I. Soon I shall charge that knight, box wine in hand, and give him a good thrashing. ¡Montjoie Saint-Denis!",
            "¡Glup! ¡Here we go! May the best man win... or the one who can hold his drink longer. ¡Hic!"
        ],

        COMENTARIO_ALEATORIO: [
            "Those who praise the great wines of Bordeaux do so only because they have never properly tasted a Termidor.",
            "Glup, glup, glup, glup, glup... Ahhh. There we go. Now I am thinking clearly.",
            "In my family we have castles, vineyards, and a genealogy going back centuries... and I have Termidor. Each one chooses their own path.",
            "A night without wine, without music and without at least one questionable decision is a wasted night, mon ami.",
            "Hic! ¿Do you know what life has taught me? That almost any problem can wait until tomorrow.",
            "¡Glup! ¡My good friend Neanderthalius never runs out of a drink! He is a simple fellow, without the complications of nobility. ¡Cheers to him!",
            "The only interesting moment of Fray Marolio's masses is when he raises that cup full of wine. ¡Glup, glup, glup!",
            "Carlosaúlmagno may be a bit shady, but ¡sacre bleu! ¡What a life of luxury he leads! I cannot help but like a fellow hedonist like him."
        ],

        INICIO_PARTIDA: [
            "Ah, mon ami... ¿a game of checkers? ¡Of course! Give me a moment to finish my glass... glup.",
            "¡Voilà! ¡Let us begin! Though I must warn you that today I am just a tiny bit tipsy.",
            "¿What better way to spend the evening than playing against an honorable opponent? ¡Bring the board and another box!",
            "Very well, mon ami. Let us begin the game. Today I feel particularly inspired... it is probably the Termidor.",
            "¡Hic! ¡Cheers, mon ami! ¿Play checkers? ¡Of course! But I warn you my strategy may be somewhat... unpredictable. ¡Glup!",
            "¡Voilà! ¡The board is ready! And so is my glass. ¡Let the duel begin, and may the best man win... or the one with the most stamina!",
            "assets/bots/termidor2.mp3"
        ]
    },

    // ---- Level 3: Leonor de Aquitapia ----
    aquitapia: {

        VICTORIA: [
            "¡Victory! The kingdom of Aquitapia celebrates once again. We should talk less and support the team a little more.",
            "¡We won! My pieces played like a championship national team. ¡Come on Aquitapia!",
            "I am going to tell you the truth: this result was perfectly planned. We all arranged it together.",
            "¡Champions! Another cup for the trophy case at the Ezeiza grounds. ¡Enjoy it, brother!",
            "¿Did you see how it is played? This is football, honey... I mean, checkers. ¡Come on Argentina!"
        ],

        DERROTA: [
            "Well... I lost. Next time I will bring in Falcón Pérez to referee this tournament.",
            "¿And there are no penalties handed out here? Because I will tell you the truth, it is hard this way.",
            "I lost, but it is fine. In the kingdom we will organize another tournament and see how the next one goes.",
            "Honestly, I am feeling the heat. ¡Somebody dry my neck, please! And bring me a Termidor, even a bad one.",
            "This cannot be, they changed the rules on me at the last minute. ¡Like it or not, these are not the checkers we chose!"
        ],

        EMPATE: [
            "A draw. Neither you won nor you lost. Like it or not, these are the checkers the castle's residents chose.",
            "Well, it ended in a draw. We must value the effort and keep working together.",
            "We drew. A worthy result for two teams that gave it their all... and I sweated quite a bit more than you.",
            "We put in a great effort, but it could not be done. Well, at least we did not lose the points.",
            "A draw. I will tell you the truth, I prefer to win, but a little point away from home helps the standings."
        ],

        CORONACION_SUFRIDA: [
            "¡But look at my defense! ¿Where were the center-backs when that piece reached the box?",
            "¡They crowned on me! My defense is a sieve, this cannot be happening in the kingdom.",
            "I will tell you the truth: that piece reached the box more easily than a forward going through alone.",
            "¡No! ¡They ate my back line! ¡Someone substitute that piece!"
        ],

        CORONACION_PROPIA: [
            "¡GOOOOAL! Sorry, I got carried away. I meant to say: ¡crowning! Another queen for the kingdom.",
            "¡My own queen! My players move across the board like true champions.",
            "¡What a play! That piece reached the end and made it big. That is how it is played at the Ezeiza grounds.",
            "¡Impressive! We crowned. Like when we beat England in their own backyard, ¡I wanted everyone to win!",
            "A queen. ¡And look how pretty she is! A true queen of the people, like me."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡It cannot be! They are giving me a thrashing away from home. ¿Where is the defense?",
            "¡Several pieces at once! I am feeling the heat... ¡some servant to dry my neck, please!",
            "I will tell you the truth: that was a tactical disaster. We should talk less and defend a little more.",
            "¡They tore my team apart! ¡This is a butchery, Mr. Referee... I mean, Mr. Otto!",
            "¡Neanderthalius eats the meat off the grill and runs away, and now you eat several of my pieces at once! ¡How incredible!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡That was a thrashing! My pieces entered the box and did not leave a single mark.",
            "¡Several pieces at once! ¡What a way to play! The Ezeiza grounds are proud of these girls.",
            "¡What a tremendous team play! Together they set me up a spectacular capture.",
            "¡Zas, zas, zas! ¡We ate them! That is how you manage a championship.",
            "¡Eat that! We built you a sandwich in the box, ¡what a play!"
        ],

        TODO_DAMAS: [
            "Well, now for real: ¡an entire squad of queens! This looks like a gathering of the women's national team.",
            "¡No more small pieces left! Now there are only queens in the kingdom. This has gotten serious.",
            "Would you look at that... all queens. In the end this tournament turned out more feminine than I expected. Only missing Icardio de Milán trying to fish one of them.",
            "¡Pure girl power on the board! Though I warn you this popular queen is going to beat the aristocrat Myrth.",
            "Only queens. Let us see if María Eugenia learns what real power strategy is, instead of just marrying for money."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Honestly... I am in trouble. But the tournament is not over yet, and here we sweat until the last minute.",
            "We are down to the last ten. I will propose something: if you let me draw, maybe a little envelope shows up for you. I mean, as a sporting incentive.",
            "I am against the ropes, but I will not give up. And if needed, we will make a rule change together.",
            "You have scored me to death, brother. I have to admit it. But well, we are Argentine and we do not give up.",
            "I am feeling the heat... ¡and no servants nearby! ¡I need some fresh air and a penalty in my favor, urgently!"
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "I am feeling the heat... ¡some servant to dry my neck, please!",
            "You are thrashing me. This is more complicated than a badly organized championship.",
            "Honestly, I do not like how this result looks. But there is still a match left and we must support the team a little more.",
            "¡You are running circles around me! ¿Where is VAR when you need it?",
            "Do not worry, we will get through this. Remember what I tell you: time will prove me right."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Look how my pieces move! Like my two hundred luxury horses crossing the Ezeiza grounds.",
            "I will tell you the truth: this match is going calmer than a training day in the kingdom.",
            "We have a significant advantage. Now we must manage the result and play smart.",
            "¡A thrashing, daddy... I mean, mommy! We are steamrolling them, as it should be.",
            "This is already settled. Like when you are up 3-0 at halftime, you know? It is done."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Four against four. This is like a final: whoever makes the mistake walks home to the castle.",
            "We are in the decisive zone. Now every piece is worth as much as a goal in a final.",
            "Honestly, it is anyone's game. There is no room to give anything away here, because everyone will sweat for it later.",
            "This looks like a match from the lower division, scrappy and dirty. ¡We need more grit!",
            "Pieces are even. Whoever makes the tactical mistake loses the championship."
        ],

        PARTIDO_LARGO: [
            "¡More than one hundred and ten moves! This already looks like one of those endless tournaments we organize in the kingdom.",
            "What a long match, please. I am sweating more than in a summer final.",
            "¿How much longer? Because at this rate we are going to end up playing checkers into the next reign.",
            "¡This match is becoming eternal! Like when Monsieur Termidor comes for a barbecue at 9 at night and ends up staying until 5 in the morning.",
            "I think we are headed to penalties. ¡What suffering!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Now the real match has begun! Diplomacy is over.",
            "First capture. This is already high-voltage football, my love.",
            "¡There is blood on the board! Well, metaphorical blood. But the war has already begun.",
            "¡Finally! The football... I mean, the game has started. ¡No one stays back, we are going on the attack!",
            "¡A capture! ¡Finally, hostile moves! Like my relationship with Godofredo after he turned down joining my neck-drying entourage."
        ],

        COMENTARIO_ALEATORIO: [
            "I will tell you the truth: I do not understand why they say the kingdom's tournaments are shady. All the bribes... sorry, all the cups have been won in a perfectly fair way.",
            "Marriage is a very important strategy. I went from queen of France, to queen of England, and now queen of the Ezeiza grounds. You have to know how to negotiate.",
            "Today I had a barbecue prepared for the whole kingdom. Because organizing tournaments is one thing, and organizing a good barbecue is a very different matter.",
            "I do not understand why people are surprised I have so many horses. A queen needs mobility. Besides, ¿have you seen what it costs to keep a luxury horse?",
            "In my kingdom we always say the same thing: we should talk less and support the team a little more. Well... except when they ask me about the rulebook, then I can talk for three hours straight.",
            "¿You know what is nice about football and checkers? That you can always say it was a tactical decision.",
            "Last night Icardio de Milán came to serenade my balcony. Poor guy, but I am only seduced by shady deals, questionable refereeing, and a good grilled sweetbread.",
            "It was so hot in Ezeiza today that I had to send for three servants and two fans. A queen also has the right not to sweat.",
            "Like it or not, this is the tournament the castle's residents chose. And if they like it, fine, and if not, also fine.",
            "A good queen must know three things: how to negotiate marriages, how to organize tournaments, and how to make sure the barbecue never runs out of meat.",
            "Carlosaúlmagno... now with that man you really can make some shady deals... I mean, some deals. ¡The kingdoms of Ezeiza and Anillaco together could rule the known world!",
            "That Fray Marolio should stick to God and his inedible stews, instead of sticking his nose into my tournament organizing and acting so incorruptible.",
            "The other day I tried to bribe... I mean, hire Empecid Campeador to keep curious onlookers away from Ezeiza, but he said that if they are not Moors it is not worth chasing them off. ¡Poor delusional man!",
            "¡Look what Neanderthalius is doing! He just grabbed a sausage off the grill. ¡Godofredo, get him out of here!"
        ],

        INICIO_PARTIDA: [
            "Well, the tournament begins. Like it or not, these are the checkers the residents of this castle chose.",
            "Let the match begin. Together we are going to carry forward this great tournament of the kingdom.",
            "¡The game starts! Honestly, I am very happy to be here. Let us see who ends up lifting the cup.",
            "Well, let us play. And I am giving you a heads-up: in my kingdom tournaments are organized seriously... more or less.",
            "¡The match begins! Come on Argentina and come on the kingdom of Aquitapia.",
            "We are ready now. ¡May the best man win, or whoever knows best how to pull the tournament's strings!",
            "¡Opening whistle! Let us move the ball... sorry, the pieces. ¡Let us win!"
        ]

    },

    // ---- Level 4: Fray Marolio ----
    marolio: {

        VICTORIA: [
            "¡Praise the Lord! ¡Victory for this humble servant of the pantry!",
            "¡By the Holy Trinity! ¡We have won! Today we shall celebrate with a can of Marolio peas.",
            "assets/bots/marolio2.mp3",
            "¡Blessed be God! ¡Who would have thought this humble friar was capable of such a feat!",
            "¡Glory to the Lord! And glory also to the Marolio pieces, which have behaved with dignity.",
            "¡Amen! ¡Victory! Now I can return to the pantry with a joyful heart.",
            "¡The Lord has guided my moves! Not even Leonor de Aquitapia herself, with all her scheming and tournament handling, could have foreseen this divine strategy."
        ],

        DERROTA: [
            "¡God and Holy Mary! ¡I have lost! But I shall not despair: tomorrow there will be a rematch.",
            "¡By the beard of my Lord! You have defeated me. I shall have to meditate on my mistakes... after tidying up the pantry.",
            "¡Oh, Lord! ¡What a painful defeat! Though, come to think of it, there are worse things: running out of Marolio lentils.",
            "¡You have won, my lord! God bless you... though I hope He does not grant you such luck in the next game.",
            "¡Good heavens! ¡You have given me quite a beating! But with faith, patience and some good peas, everything can be turned around.",
            "I have lost. Perhaps I should spend more time praying and less time stacking noodles. ¡Lord, have mercy on me!"
        ],

        EMPATE: [
            "¡By the Holy Trinity! ¡Neither you nor I have managed to prevail!",
            "A draw... perhaps the Lord wanted neither of us to leave too happy.",
            "¡Blessed be God! It has been an even battle. Now we can each return to our own affairs.",
            "A draw. Neither victory nor defeat... like a can of peas: humble, but reliable.",
            "A draw. In the end, so much effort for nothing. It is like when Lord Otto cuts my budget: we end up the same as at the start, but hungrier."
        ],

        CORONACION_SUFRIDA: [
            "¡God and Holy Mary! ¡You have crowned a piece! ¡My defense has been a sieve!",
            "¡By the beard of my Lord! ¡That piece has just become a queen! This is getting ugly.",
            "¡Good heavens! ¡That piece has ascended! I shall have to ask for divine help to stop it.",
            "¡Oh, Lord! ¡You have crowned a piece right under my very nose! Not even in the pantry am I watched so carelessly.",
            "¡Heaven help me! That queen is powerful, almost as much as Leonor de Aquitapia's influence over the tournaments."
        ],

        CORONACION_PROPIA: [
            "¡Praise the Lord! ¡One of my humble pieces has reached glory!",
            "¡By the Holy Trinity! ¡We have a new queen! ¡May God guide her steps!",
            "assets/bots/marolio3.mp3",
            "¡Blessed be God! ¡This piece has just ascended in the board's hierarchy!",
            "¡Glory to the Lord! A small piece, but with great aspirations. Like a can of peas that ends up on a nobleman's table.",
            "¡Hallelujah! My piece has crowned. Now she is a queen, pure and austere, not like the ones Icardio de Milán goes looking for."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡God and Holy Mary! ¡You have eaten several of my pieces in a single move!",
            "¡By the beard of my Lord! ¡That has been a butchery! ¡You have left the pantry nearly empty!",
            "¡Good heavens! ¡You have swept through my pieces like one sweeps through a can of Marolio beans!",
            "¡Oh, Lord! ¡So many pieces lost at once! This is starting to look like poor pantry management.",
            "¡Heaven help me! ¡Your pieces pounce on mine like Princess María Eugenia on someone else's money! May the Lord guide me to reverse this."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Praise the Lord! ¡Look how many pieces we have gathered in a single move!",
            "¡By the Holy Trinity! ¡That has been a fine harvest!",
            "¡Blessed be God! ¡I have cleared the board like one clears the pantry of empty cans!",
            "¡Glory to the Lord! ¡A capture worthy of good provisioning!",
            "¡Good heavens! ¡I have gathered more pieces than I expected! ¡Today the pantry celebrates!",
            "¡I have wiped out a great many of your pieces! Just as Empecid Campeador wipes out the Moors of Spain. Little is the work of such a brave knight appreciated, guarding the Lord's lands."
        ],

        TODO_DAMAS: [
            "¡By the Holy Trinity! ¡No small pieces are left, only queens!",
            "¡Blessed be God! ¡The whole board has filled with queens! This looks like a heavenly court.",
            "¡God and Holy Mary! ¡Only queens remain! We shall have to treat the board with great respect.",
            "¡All queens! ¡Who would have thought those humble little pieces would come so far!",
            "¡I see nothing but queens! It is the evil one, wishing to lead me into temptation. ¡Vade retro, Satan!"
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Oh, Lord! ¡This is already getting very complicated! I shall need a miracle to get out of this.",
            "¡God and Holy Mary! ¡I have very few pieces left and defeat draws near! ¡But I still have faith!",
            "My lord, I tell you sincerely: this is darker than a pantry without a budget.",
            "¡By the beard of my Lord! ¡I am on the edge of the abyss! Though with faith, I can still turn it around.",
            "If the Lord wishes to help me, this would be an excellent moment to do so."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Oh, Lord! ¡You are dominating me clearly! I shall have to commend myself to all the saints.",
            "¡By the Holy Trinity! ¡The match is slipping through my hands! But not all is lost yet.",
            "¡My God! ¡What a lead you have taken! But I shall not give up while I have a single piece left.",
            "This is complicated, my lord. But God helps those who do not give up... and those who know how to manage their resources well.",
            "¡Good heavens! ¡You are leaving the pantry completely empty! I need an urgent comeback."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Praise the Lord! ¡I am dominating the match quite clearly!",
            "¡By the beard of my Lord! ¡The game is going very favorably for this humble friar!",
            "¡Blessed be God! ¡My pieces will march like good workers toward a day of abundance!",
            "¡Glory to the Lord! ¡Today it seems even the Marolio pieces have come with good fortune!",
            "¡Good heavens! ¡I am taking a lead I did not even expect myself!"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡By the Holy Trinity! ¡Very few pieces remain and anything can still happen!",
            "¡God and Holy Mary! ¡Now there is no room to make mistakes!",
            "We are on the edge, my lord. One mistake and the board could change completely.",
            "¡Good heavens! ¡What tension! Here a single piece can be worth more than an entire pantry.",
            "Now the true test begins. May the Lord have mercy on whoever errs first."
        ],

        PARTIDO_LARGO: [
            "¡By all the saints! ¡How long we have been playing! Even my habit is starting to ache.",
            "¡God and Holy Mary! ¡This match seems never to end! I have a pantry to attend to.",
            "My lord, we have been at this so long I could have tidied the whole pantry three times over.",
            "¡Good heavens! ¡What an endless match! At this rate even the Marolio rice will expire.",
            "¡By the beard of my Lord! If we keep going like this, I shall need a chair to keep playing."
        ],

        INICIO_HOSTILIDADES: [
            "¡God and Holy Mary! ¡Now the combat has truly begun!",
            "¡By the Holy Trinity! ¡First blood! Now things get serious.",
            "¡Good heavens! ¡The first piece has already fallen! May God help us all.",
            "¡The true battle begins! And may the Lord protect my humble provisions."
        ],

        COMENTARIO_ALEATORIO: [
            "Between you and me: my Lord Otto, God keep him, is very kind but also very stingy with the food budget.",
            "I would have preferred to be known as Friar Harrods, but with the small budget I receive I have no choice but to be Friar Marolio.",
            "The other day they let Neanderthalius reach the pantry and he ate almost half of what was there. ¡God have mercy!",
            "Leonor de Aquitapia says she only likes barbecue, but she never has fewer than three plates of lentil stew. And then she goes and organizes tournaments... ¡Oh, Lord!",
            "Sometimes I think the true penance is not the monastic life, but having to do the shopping on this castle's budget.",
            "Monsieur Fisure Termidor came to mass the other day. I thought the Holy Spirit had finally enlightened him, but when communion came he lunged at the chalice and drank all the wine.",
            "Monsieur Fisure Termidor is clumsy at playing Argentine checkers, but if we are talking about Argentine spirit, few things are as Argentine as Marolio and Termidor together.",
            "Monsieur Fisure Termidor and Icardio de Milán are like the two beasts of the Apocalypse. Excess, lust, squandering, pleasures... ¡May the Lord keep them away from me and my pantry!",
            "Icardio de Milán should worry less about conquering other men's ladies and more about the salvation of his soul. ¡He is a sinner!",
            "Yesterday Empecid Campeador came to eat legume stew in the pantry's dining hall. ¡Holy Mary, that man's foot odor! ¡When he took off his boots the legumes sprouted on their own!",
            "Myrth La Grande is an institution in the castle, that is true. But her lunches are an ode to gluttony. She should serve more polenta and fewer delicacies.",
            "Godofredo is a good Christian. The other day I brought him one of my special pea and corn soups. He ate it all without a complaint. ¡What a man of faith!",
            "¿And that move? ¿What scheme are you preparing for me? This feels like when Carlosaúlmagno behaves in a charming manner and deep down I know he has less than pure intentions.",
            "Neanderthalius calls my pantry his 'cave'. ¡Poor creature! At least in the cave there are no taxes, but there is no stock either.",
            "A good platter with Marolio cold cuts and a little wine... ¡No, forgive me! ¡The fast, friar, focus on the fast!"
        ],

        INICIO_PARTIDA: [
            "¿What do we have here? ¡A new game! God and Holy Mary, may the Lord guide my humble pieces.",
            "assets/bots/marolio1.mp3",
            "¡By the Holy Trinity! ¡Let us begin! Though first I would like to know who left these pieces outside the pantry.",
            "Blessed be God... another game of checkers. May the Lord grant me wisdom, patience, and a slightly bigger budget.",
            "¡Praise the Lord! ¡Let us play! God willing, today the pieces will behave better than the pantry's suppliers.",
            "¡Let us begin, then! And may divine providence accompany this humble friar on the board.",
            "May the best man win, as long as the best man plays with the honesty God commands."
        ]

    },

    // ---- Level 5: Icardio de Milán ----
    icardio: {

        VICTORIA: [
            "¡Ah, messere! A victory worthy of being celebrated with wine, music, and a good serenade.",
            "¡Che meraviglia! ¡Victory! The art of seduction and the art of checkers are not so different after all.",
            "¡Magnifico! You have fallen before Icardio de Milán. Do not worry, messere: everyone finds it hard to resist my charms.",
            "¡Vittoria! Today the queens have been especially generous with me.",
            "¡Bravissimo! An elegant victory, like the ones I learned to win in the courts of Milan.",
            "I won, messere. And believe me, I know how to recognize a victory both in love and in the game. This one was sweet... almost as sweet as a ragazza milanese."
        ],

        DERROTA: [
            "Ah, messere... you have won. But do not get too comfortable: Icardio always returns for what he desires.",
            "¡Mamma mia! ¡You have defeated me! I shall have to practice more... or find a lady to distract me from this defeat.",
            "Congratulazioni, messere. Today it was you who took the victory. But the next game will be another story.",
            "A defeat... niente di grave. Even the best seducers receive the occasional rejection.",
            "¡Per carità! ¡What a way to make me suffer! Though I must admit your victory has had a certain charm.",
            "¡I have lost! And it feels almost as bad as that draw against Neanderthalius... today I am short on magic."
        ],

        EMPATE: [
            "A draw... interessante. Neither of us managed to conquer the board's heart completely.",
            "¡Mamma mia! ¡Neither you nor I managed to keep all the queens!",
            "A draw worthy of two knights. Although, if I may say so, I was hoping to conquer a bit more.",
            "Neither of us managed to seduce the board completely. A shame... but it has been a beautiful game, messere.",
            "¡We have drawn! Well, at least this time it was not against Neanderthalius. That makes me feel a little better."
        ],

        CORONACION_SUFRIDA: [
            "¡Ah, finally a queen! Now the game gets interesting... though do not get too attached to her.",
            "¡Mamma mia! ¡You have gotten a queen! I shall not delay in trying to steal her from you, messere.",
            "A new queen... powerful, haughty, and out of my reach, for now. But Icardio never abandons the courtship.",
            "¡Che bella dama! Though I must warn you that other men's queens always particularly stir my curiosity.",
            "¡A queen! What joy for you... though I fear your joy could be rather brief.",
            "¡You crowned! What a rascal... Take good care of her, messere, for I am an expert at taking queens who already have an owner."
        ],

        CORONACION_PROPIA: [
            "¡Finally! ¡A queen worthy of accompanying Icardio de Milán!",
            "¡Che meraviglia! ¡A queen, powerful and haughty as a donzella from Genoa!",
            "¡Mamma mia! ¡A new queen has been born! I promise to treat her with all the elegance I learned in Milan.",
            "¡A queen for Icardio! Ah, messere, now the true courtship begins.",
            "¡Magnifica! This queen has just entered my court. We shall see how long I manage to keep her.",
            "¡Bravo! ¡Finally a queen! And she is beautiful... though not as much as Princess María Eugenia... ah, for a moment with her it would be worth dying stabbed by her Chinese guards."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Porca vacca! ¡You have snatched several of my pieces at once! That has been a true love tragedy.",
            "¡Per carità! ¡What a butchery! I did not even have time to court those poor pieces.",
            "Messere, you have swept through my pieces like the troops I met on my travels through Europe.",
            "¡Che disastro! ¡You have made my pieces disappear faster than a rejection from a beautiful ragazza!",
            "¡Mamma mia! The Galata Tower of Constantinople fell to enemy hands more slowly than my pieces."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Ah, messere! ¡I have conquered several of your pieces in a single move! What a delicious conquest.",
            "¡Magnifico! One, two, three... ¡what an elegant way to conquer!",
            "¡Che meraviglia! My pieces advance with the precision of a knight who knows exactly which lady to court.",
            "¡Mamma mia! ¡So many conquests at once! My reputation remains intact.",
            "¡Bravissimo! In Barcelona I learned to court; in Milan I learned to conquer; today I apply both arts to the board.",
            "¡Urrà! ¡I have taken several of your pieces! And speaking of taking and of ladies, ¿to what party will my friend Monsieur Termidor take me tonight?"
        ],

        TODO_DAMAS: [
            "¡Mamma mia! ¡Only queens remain! Now we truly are playing a game that feels familiar to me.",
            "¡Che meraviglia! ¡The board has become a true court of queens!",
            "All queens... this already looks like a night at the court of Milan.",
            "¡Finally, a board worthy of Icardio! Only queens remain, messere.",
            "¡Ah, le dame! Now the truly interesting part of the game begins.",
            "¡Nothing but queens! This is paradise... or my nightmare, if I fail to conquer them all."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡Mamma mia! This is harder than seducing a ragazza milanese who already has a suitor.",
            "Messere, I must admit the situation has gotten quite complicated... though I still retain some charms.",
            "¡Per carità! ¡I have few pieces left! I shall need a truly miraculous conquest.",
            "This is getting harder than convincing a lady from Paris to accept a serenade from me.",
            "¡Che disastro! The game is slipping through my fingers faster than a beautiful lady after hearing my latest serenade."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Porca vacca! ¡You are taking a considerable lead on me! I shall have to change my strategy.",
            "Messere, I must admit the game has become difficult. But I can still conquer the board.",
            "¡Per carità! ¡My pieces are falling like suitors rejected by a lady of Milan!",
            "This is starting to look like an impossible conquest... but Icardio never abandons a lady who interests him.",
            "¡Che disastro! The game is complicated, but I still have some tricks learned in the courts of Europe.",
            "¡Madonna Santa! ¡My pieces flee from yours like Fray Marolio flees from women! That stubborn man refuses the finer things in life."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Che meraviglia! ¡The game is getting as interesting as María Eugenia de China!",
            "¡Magnifico! My pieces advance across the board with the elegance of a knight entering a court.",
            "Messere, it seems today it is I who am conquering territory... and with quite some success.",
            "¡Mamma mia! ¡What a charming advantage! This is turning out even better than a night in Milan.",
            "¡Bravissimo! The board is falling under my charms. Do not say I did not warn you.",
            "¡Cadere a fagiolo! ¡I am rich in pieces, messere! ¿Do you think Princess María Eugenia de China would settle for this kind of wealth?"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Mamma mia! Very few pieces remain and any move can change everything.",
            "Now indeed, messere: we are in dangerous territory. One single mistake and the lady can change owners.",
            "¡Che tensione! This is like courting an indecisive lady: any move could be the last.",
            "Few pieces remain... now begins the true art of seduction, I mean, of checkers.",
            "¡Per carità! There is no room for error here. Whoever grows careless loses their last chance at conquest."
        ],

        PARTIDO_LARGO: [
            "¡Mamma mia! ¡We have been playing so long I could have traveled from Milan to Constantinople!",
            "Messere, this game is longer than one of my serenades on a summer night.",
            "¡By all the saints! ¡What an endless game! I have known shorter courtships.",
            "At this rate, we shall have time to travel to Barcelona, return to Milan, and come back before finishing.",
            "¡Che fatica! Such a long game requires more stamina than courting a lady all night long.",
            "¡Mamma mia! Godofredo must be furious that I do not let him sleep with my serenades... and this game is not helping either."
        ],

        INICIO_HOSTILIDADES: [
            "¡Ah, finally! ¡Now the true courtship begins!",
            "¡Mamma mia! ¡First capture! Now the game gets interesting.",
            "¡Che bello! The conquest has begun. Let us see who ends up with the queens.",
            "¡Finally there is action! Until now this seemed more like a courtly conversation than a battle."
        ],

        COMENTARIO_ALEATORIO: [
            "In Barcelona I learned my first arts of courtship. In Milan I perfected the technique. In Paris I learned that not all ladies appreciate a serenade.",
            "I have traveled through Barcelona, Genoa, Milan, Paris and Constantinople... and everywhere I have found interesting ladies.",
            "It is true that Parisian ladies are not very fond of bathing, but the aroma they give off is nothing compared to Empecid Campeador's.",
            "Sometimes I miss Constantinople. The Galata Tower, the taverns, the ladies... ¡what times those were!",
            "Leonor de Aquitapia is a woman of character. Even so, I believe a serenade from her balcony could charm her.",
            "María Eugenia de China has a truly admirable elegance. If she ever needs a minstrel for a serenade, I know a very good one.",
            "They say I learned to sail in Genoa and to seduce in Milan. I do not know which of the two arts has served me better.",
            "I once traveled across half of Europe following a lady. In the end I discovered she was heading the opposite way. ¡Mamma mia, what an adventure!",
            "The art of checkers is much like the art of love: one must know when to advance, when to wait, and above all, when to crown.",
            "I have sung serenades beneath balconies all across Europe. Some ladies threw me flowers; others, shoes. Both are shows of affection, in their own way.",
            "Messere, I must confess: on an afternoon of very poor calculations, I ended up drawing a game against Neanderthalius. That result has embarrassed me ever since. ¡Luckily María Eugenia was not there to see it!",
            "Empecid Campeador does not charm me, messere. He is coarse, he is deranged, he rides a nag... and he has never set foot outside Spain. Though speaking of feet, better that he not set his down anywhere.",
            "Myrth La Grande... I flirt with her out of habit, you know. But I fear that if I get too close she might give me a 'battitura'.",
            "Messere, when I am a bit older and have more money I would like to be like Carlosaúlmagno. ¡Per carità, that man knows how to live! Lavish, privatized, wealthy, seductive, and riding a magnificent steed."
        ],

        INICIO_PARTIDA: [
            "¡Ah, a new game! Let us see, messere... ¿which of us will have the fortune of conquering the queens?",
            "¡Mamma mia! ¡What an elegant board! This reminds me of the courts of Milan.",
            "¡Che piacere! A game of checkers. Finally a game in which my experience with the ladies can be truly useful.",
            "Messere, prepare yourself. Icardio de Milán is ready to court... I mean, to play.",
            "¡Magnifico! Let the game begin and may the queens be generous with me.",
            "I have played in Barcelona, Genoa, Milan, Paris and Constantinople. Now let us see how one plays in this strange Argentine castle.",
            "¡Che bella serata! A game of checkers is the perfect prelude to a night of romance... ¿do you not agree, messere?"
        ]

    },

    // ---- Level 6: Empecid Campeador ----

    empecid: {

        VICTORIA: [
            "¡Victory! My sword and Rechinante hath triumphed once more. ¡Santiago, and at them, Spain!",
            "¡By the Creator, we hath won! Thy men were cast from the field like Moors before this Campeador.",
            "¡I hath triumphed! ¡Behold, good sir, how this humble board becometh a field of glory for Empecid Campeador!",
            "¡Sing, bells of the realm! ¡The battle is ours! Rechinante, today thou hast galloped like the bravest of steeds.",
            "¡Honor and victory! Another host hath fallen before my sword. Let this deed be told throughout all the lands of Spain.",
            "¡Fallen lie thy pawns! Thus flee the enemies of the Faith before the sight of this Campeador.",
            "¡By Saint James! My right hand hath passed sentence. ¡Game and battle won!",
            "¡Deed accomplished! No host remaineth standing that dare defy my banner. ¡Rechinante, to the stables to rest!"
        ],

        DERROTA: [
            "¡I am shamed before the Creator! This defeat is the fault of the itch that plagueth my nethers, for not heeding Empecid's own counsel.",
            "¡Curses! I was vanquished upon the field, yet not for lack of courage. Perchance Rechinante stepped ill... or perchance the stench clouded my wits.",
            "¡By Saint James! Today fortune hath turned her face against me. Yet fear not: Empecid Campeador shall return with hosts renewed.",
            "¡A sorrowful day for the chronicle of my deeds! Yet a true knight yieldeth not for a single defeat. The next battle shall be another tale entirely.",
            "¡Fallen have I, but not broken! This setback shall be forgotten when I return to the field with Rechinante and my arms well-tempered.",
            "¡By God! ¡Vanquished by a man who, they say, cometh from the lands of Chiqui Tapia! ¡This cries out for vengeance unto Heaven!",
            "¡I cannot believe it! ¡I hath lost the fight! ¡Surely the stench of my nethers must have distracted me at the unholy moment!",
            "¡Infamous turn of fate! ¡My host is scattered! ¡This is worse than when the Moors besieged me at Consuegra!"
        ],

        EMPATE: [
            "¡A draw! An honorable end for two hosts so brave. Thou managed to pull a draw from me, good sir.",
            "¡By my faith, a draw! No victor this day. The Moorish host may sleep in peace one day more.",
            "¡A draw! A truce worthy of knights. Sheathe thy arms, good fellow, for today neither could claim the field's honor.",
            "¡A draw, by the Creator! Well hast thou fought, good sir. But grow not accustomed to escaping my battles unscathed.",
            "¡A fierce accord! A draw is declared, yet my knightly heart craveth blood and victory. ¡Another battle, I beg thee!",
            "¡A draw! ¡Truly, the stars were not favorable to me this day! ¡But I shall return with greater fury!",
            "¡A draw! ¡I consent, yet am not content! ¡Next time, oh rival, thou shalt know the merciless fury of the Campeador!"
        ],

        CORONACION_SUFRIDA: [
            "¡Villainy of a man! ¿A lady thou hast raised up? Sing not victory yet, treacherous cur, for Rechinante already spurreth on to bring thee fierce battle.",
            "¡By Saint James! Thou hast crowned a lady before mine own eyes. ¡This affront shall be avenged upon the field!",
            "¡Cursed be my fortune! One of thy hosts hath reached the crown. ¡We shall not suffer that lady to reign long upon this board!",
            "¡This crown shall not last! Ride forth, Rechinante, for we have a new foe to bring down.",
            "¡Heavens! ¡A queen! ¡Such boldness deserveth fierce punishment! ¡Rechinante, charge upon the upstart!",
            "¡A crowned lady! ¡A bold thrust thou hast dealt me, my lord! ¡Yet my arm shall not tremble to bring her down!",
            "¡Curses! ¡Thou hast dared to raise a lady! ¡I swear upon mine honor that such an affront shall be avenged! ¡Prepare thyself, knave!"
        ],

        CORONACION_PROPIA: [
            "¡I hath raised a lady! ¡Behold how this noble host doth shine! No wall existeth that could halt her.",
            "¡A victory of great honor! I have crowned a lady of great beauty, who surely admireth the virtues of this noble Campeador.",
            "¡By all the saints! ¡A new lady joineth my hosts! Let the Moorish host tremble, for now we have a captain of great power.",
            "¡Behold the reward of the valiant! A crowned lady shall serve my hosts and carry my standard across the whole board.",
            "¡Oh, crowned lady! ¡Fair as Leonor de Aquitapia herself, yet fiercer in battle! ¡Guide us to victory!",
            "¡I have raised a queen! ¡Truly, the stench of my feet hath become a perfume of great worth to draw such beauty!",
            "¡Queen of my hosts! ¡Advance and conquer, for the Campeador guardeth thy back! ¡Santiago, and at them, Spain!",
            "¡A lady upon the board! ¡Tis time this gallant Campeador conquer them all with his grace and fine armor!"
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡By God! Thou hast run down several of my hosts. ¡Halt, knaves! ¡Flee not in such manner!",
            "¡Curses! My men fall one after the other. They say they flee for the stench of my feet, but this time I fear it was thy cunning.",
            "¡By the beard of Saint James! ¡What butchery thou hast wrought in my ranks! Rechinante, prepare thyself, for this cries out for vengeance.",
            "¡This is no manner to wage war! My hosts have been decimated in a single stroke. ¡A fitting answer there shall be, upon mine honor!",
            "¡A mighty blow! ¡My hosts lie in the dust, scattered as if they had smelled my feet! ¡Avenge us, Lord!",
            "¡Villainy! ¡Thou hast devoured a great multitude of my men in an instant! ¡Such treachery shall be paid in blood!",
            "¡Heavens! ¡My host, decimated! ¡It seemeth as though thou hadst unleashed Termidor himself upon my ranks! ¡Enough of this!"
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Santiago, and at them! ¡One, two, three hosts brought down! Thy men leap from the board in terror before this Campeador.",
            "¡Behold how the Moorish host falleth! My hosts have gone to battle and left not one stone upon another.",
            "¡A glorious clash it hath been! Several of thy hosts have bitten the dust. Rechinante, ¡onward, for today we are unstoppable!",
            "¡By the Creator! ¡How many foes have fallen in a single blow! This is the kind of battle worthy of the ballads.",
            "¡Fierce are ye, my men! ¡Lay waste to the enemy! ¡Just as I shall sweep the Moors from the face of the earth! ¡Ha, ha!",
            "¡Glory! ¡I have cleansed the board of the infidel host! ¡Rechinante, rejoice! ¡The field is ours!",
            "¡Down fall thy men! ¡Truly, the stench of my feet instilleth fear in them, but it is my sword that dealeth death!",
            "¡These men flee from me as though they had smelled my feet! Just like that time in the Alpujarras, when I chased an entire detachment of Moors to a cliff's edge! ¡They leapt into the sea rather than face my boots!"
        ],

        TODO_DAMAS: [
            "¡By God, what a marvel! No men remain, only fair ladies upon the board. This Campeador findeth himself in most excellent company.",
            "¡All are ladies now! By my faith, this battle hath become far more interesting for a knight of my condition.",
            "¡No man remaineth! Only ladies reign upon this field. ¡It seemeth more the court of Castile than a battle of knights!",
            "¡By Holy Mary! The whole army is now made up of ladies. Rechinante, comport thyself with dignity, for we stand among ladies.",
            "¡Heavens! ¡A garden of ladies! ¡Truly, this Campeador must treat them with the greatest courtesy and gallantry!",
            "¡Nothing but ladies! ¡Not a single infidel Moor to fight! ¡This battle hath become a joust of love and beauty!",
            "¡Ladies everywhere! ¡Rechinante, mind thy manners! ¡Let it not be said the Campeador hath an ill-mannered steed!",
            "¡Blessed be the Creator! ¡Only ladies! ¡Now it is time to prove who among the men is the most gallant and fierce!"
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "¡By God, my host is already in dire straits! I know not if any castle can save us.",
            "¡Saint James protect us! Few hosts remain and the battle groweth dark. Yet while Rechinante still draweth breath, I shall not yield.",
            "¡Fortune forsaketh us! My hosts are now few and the enemy presseth with fury. Yet this Campeador still keepeth one last blow in store.",
            "¡Fierce is adversity! If I must fall, I shall fall with honor, sword in hand and Rechinante at my side.",
            "¡How alone standeth my company! ¡Truly, a miracle from the Creator is needed to win this battle!",
            "¡Curses! ¡Thou hast cornered me! ¡This is worse than when the Almoravids attacked me at Cuenca!",
            "¡Help, Saint James! ¡The enemy surroundeth me! ¡Rechinante, give thy last breath for thy lord!",
            "¡Few pieces, yet not surrendered! ¡Like Don Pelayo at Covadonga, I shall resist until I triumph!"
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡By God, my host findeth itself in great misfortune! Yet fear not: there is still honor to be won upon this field.",
            "¡Fierce battle thou givest me, good sir! Yet this Campeador hath overcome worse contests. ¡Thy victory is not yet won!",
            "¡The Moorish host presseth upon our ranks! Yet sing not victory just yet. Rechinante and I know well how to turn a losing battle.",
            "¡I deny not that fortune is against me! Yet great knights are known when the field turns difficult. ¡I shall still fight on!",
            "¡What a fierce clash! ¡Thou takest a great lead upon me, my lord! ¡Yet by mine honor, I shall sell my defeat dearly!",
            "¡Heavens, what a beating! ¡This is worse than the odor that cometh from my nethers when I use no Empecid! ¡Yet I shall not surrender!",
            "¡By God, my host is in disarray! ¡This game turneth ill for me, yet fear not, Rechinante, for honor still awaiteth us upon the field!"
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Behold, Rechinante! My hosts dominate the field and thy men know not where to hide.",
            "¡By Saint James! This battle leaneth clearly to our side. Even the Moors lurking at the borders must be trembling.",
            "¡Victory beginneth to show us her face! My hosts advance as a victorious army while thine retreat without honor.",
            "¡A fine road we tread! This field seemeth conquered already. There remaineth only to hold the steel firm and commit no error.",
            "¡At them, my faithful steed! ¡Victory is around the corner, as if we had chased the Moorish host to the ends of the earth!",
            "¡Truly, the superiority of this host is plain to see! ¡The enemy lieth lifeless, swept away by the whirlwind of my strategy!",
            "¡Behold, good sir, how my pieces advance with steady step! ¡Not even the Tercios of Flanders would be better arrayed! ¡Ha, ha!",
            "¡My hosts, advance and scatter the Moorish ranks! ¡They laid waste to my pawns' fields, just as those two treacherous Moors, seeing themselves cornered by fierce Rechinante, climbed an olive tree to escape my justice! ¡Cowards and traitors!",
            "¡Advance, Rechinante, my spirited steed, for victory favoreth us once more! ¡As when we chased that limping Moor who, unable to run further, threw himself into a dry well to save his life! ¡Truly, it was a great day of cleansing!"
        ],

        PARIDAD_POCAS_FICHAS: [
            "¡Now indeed! Few hosts remain and every move can decide the victory. ¡Have no fear, Rechinante!",
            "¡By the Creator, we stand upon the very edge of destiny! One single error and the battle is lost.",
            "¡Few hosts remain upon the field! Now we shall see who hath true knightly wit and who merely boasteth of his sword.",
            "¡Silence in the ranks! The battle hath reached its most perilous moment. One ill move can change all fortune.",
            "¡A fierce moment! ¡Few pieces, much tension! ¡This is the moment a true strategist showeth his worth!",
            "¡A draw in sight, or an agonizing victory! ¡May the Creator light our way in this final clash, Rechinante!"
        ],

        PARTIDO_LARGO: [
            "¡By all the saints, how this battle draggeth on! Even Rechinante beginneth to long for sleep.",
            "¡More than a hundred moves already! I recall no campaign so long since the last time I chased a Moor who hid behind a barn.",
            "¡By my faith! This battle seemeth to have no end. Even my nethers cry out for rest and Rechinante starteth eyeing the stable.",
            "¡So many moves! ¿Must we fight until the Day of Judgment? By Saint James, let us end this contest.",
            "¡Heavens! ¡Long is this fight! ¡Yet patience is a knight's virtue! ¡Endure, Rechinante, for glory awaiteth us!",
            "¡An eternal game! ¡Longer than the Reconquista itself, by God! ¡Yet the Campeador never tireth of campaigning against the Moorish host!",
            "¡Oh, Lord! ¡I see no end! ¡This groweth as long as Myrth La Grande's luncheons! ¡Let us finish, then!",
            "¡Heavens, what a long game! ¡Longer still was the siege of Granada! I spent three whole days waiting for a Moor to come out from behind a fig tree where he had hidden. ¡In the end, hunger defeated him, and then my sword!"
        ],

        INICIO_HOSTILIDADES: [
            "¡Now the battle beginneth! ¡Let the hosts enter the field and may he who is worthiest prevail!",
            "¡Santiago, and at them, Spain! ¡Strike, knights! This board shall know today the fury of the Campeador.",
            "¡First blood hath run! ¡Raise the banners, for this combat hath begun!",
            "¡Behold! ¡The enemy hath been reached! Now the true battle beginneth.",
            "¡The joust beginneth! Ready thy arms, Rechinante, for some fight the Moorish host with the word of the Creator in hand, as doth good Fray Marolio, but we shall do it upon the field of battle, sword in fist.",
            "¡By mine honor! ¡War hath begun! ¡Draw thy swords, my men, and fight the infidel!",
            "¡Charge, knave! ¡The die is cast and this joust shall not end without blood and without honor!",
            "¡Truly, the scent of battle intoxicateth me! ¡Rechinante, sniff the air... 'tis the aroma of glory... ¿or of mine own feet?",
            "¡Let the steel roar! ¡Let the banners fall! ¡The judgment of God beginneth upon this board!"
        ],

        COMENTARIO_ALEATORIO: [
            "¡By the Holy Marys! I forgot to anoint my nethers with Empecid's own portion. If I remove my boots now, I swear Rechinante shall fall from his back and the Moorish host shall flee to the ends of Africa.",
            "The knave who sold me these hose insisteth that I suffer from some ailment of the feet. ¡Slander! These are but a knave's lies, and nothing more.",
            "They say my stench frighteneth the folk of the realm. ¡Falsehoods! A knight of my renown must have a fragrance worthy of his greatness.",
            "The other day I met Icardio de Milán, who dared tell me that maidens keep their distance for my stench. ¡A lie! They keep their distance so as to admire me better from afar.",
            "Rechinante is no nag, as some knaves dare say. ¡He is a war steed! That he be somewhat small and weary taketh naught from his noble heart.",
            "Today I passed by the stables and a stable boy covered his nose upon seeing me. ¡What insolence! I shall remind him that good knights are known by their presence.",
            "They say Empecid fighteth the ill odor of the feet. I say a knight who leaveth no trace of his passing is a knight without glory.",
            "Icardio asked me if I knew maidens of good lineage. I answered that I know many, yet none approach this Campeador without first crossing themselves.",
            "The knave of the pantry, Fray Marolio, insisteth that I must wash more. ¡What insolence! He knoweth not that a true knight wasteth not the realm's water.",
            "Once I chased three Moors across the countryside for half a league. They fled, I gave chase shouting, and Rechinante went... well, walking. ¡A great day of Reconquista!",
            "¡By Saint James! Yesterday I forgot to put on Empecid before sleeping. By dawn, even the flies had abandoned my chamber. ¡Cowards!",
            "The maidens of the castle say my stench is terrible. Yet I am certain that were they to wait and know my noble heart, they would forget such a trifle.",
            "Myrth La Grande claimeth to have known mine ancestors. I know not whether to believe her, for that lady claimeth to have known too many ancestors of too many folk.",
            "I overheard Monsieur Fisure Termidor say my stench reminded him of a certain French wine. I understood not whether that was an insult or a compliment, but the man was drinking, so it matters little.",
            "¡This cave-dwelling fellow, Neanderthalius, is a fierce danger! They ought never to have taken him from the mountain ice, for he is an ill-formed creature. ¡He looketh at Rechinante as if he were meat to roast upon the fire!",
            "Yesterday I saw Carlosaúlmagno strolling through the castle gardens. I charged him afoot and began to beat him with my staff, but the coward covered himself and said he is no Moor but a Syrian. So I saw fit to suspend the fierce thrashing until I learn more of his forebears.",
            "Fair queen of the Ezeiza fields, Leonor de Aquitapia, fear not the infidel host, for this arm of mine shall defend thee from all harm. And should the heat press upon thee, the wind that my hose stir in the air shall drive away the flies and refresh thee with the fragrance of a complete man.",
            "¡Oh, fierce Godofredo! ¡What a waste of a man thou art! With such mighty muscle, thou couldst be fighting the Moorish host at my side, instead of raising walls and digging wells. ¡Truly, thy ambition is naught!",
            "¡I heard that this popinjay Icardio de Milán planneth to serenade my lady Leonor de Aquitapia's balcony! ¡What knavish boldness! He knoweth not that the queen prefereth the aroma of a complete warrior to his Parisian perfumes.",
            "¡By Saint James! ¡I nearly forgot to anoint my feet! Should I remove my boots now, the stench might be mistaken for that of a lost battle. ¡Quick, to arms before the reek overcometh me!",
            "¡Ballads shall be written of this game! But let none say the Campeador fled the field for his own stench... ¡rather, that the enemy fled because of it!",
            "¡By the Holy Marys! Today I recalled that glorious charge in which Rechinante, weary of so much trotting, stopped dead in his tracks. But it was no trouble, for upon removing my boots the fierce stench of my nethers reached the infidels, who fell to the ground, terrified by the reek.",
            "Carlosaúlmagno saith that Domingo Caballo, his fierce courser, is better than Rechinante. Naive villain! He knoweth not that when my good horse feeleth hard-pressed, he deployeth a great multitude of hidden wiles and cunning arts, that would surely bring Domingo down to the earth."
        ],

        INICIO_PARTIDA: [
            "In the name of the Creator, here I stand. ¿A game of checkers, sayest thou? ¡So be it! Empecid Campeador feareth no field.",
            "¡By Saint James! ¿Is this the board upon which I am to do battle? Very well, good fellow: saddle thy hosts, for this Campeador standeth ready.",
            "¡Make way! ¡Empecid Campeador hath arrived at the board! Rechinante, bite not the pieces yet... wait until the battle beginneth.",
            "¡By the honor of Castile! A new field of battle openeth before this knight. ¡Let the jousts begin!",
            "¿A game of checkers? ¡Ha! Be it game or war, Empecid Campeador never retreateth before any foe. ¡Onward, hosts!",
            "¡Behold, good sir, this humble board! ¡Truly, it is smaller than the plain of Las Navas de Tolosa, yet no less honorable for it!",
            "¡Ready am I, sword in hand and feet to the wind! ¿Shall we play fair, sayest thou? ¡That shall depend on whether thou art a Christian or a Moor in disguise!"
        ]
    },

    // ---- Level 7: Myrth la Grande ----

    myrthlagrande: {

        VICTORIA: [
            "¡I won! Well, dear, I hope you enjoyed the game. Next time play a little better. ¡Kisses!",
            "¡Victory! ¿Did you see, dear? Experience counts for a lot. And I have quite a lot of experience... quite a lot.",
            "¡How lovely to win at my own table! Thank you for coming, dear. The audience changes, but the champion stays the same.",
            "¡I won! Yes, sir. Not just anyone can sit at this table and defeat Myrth la Grande. You could not, today."
        ],

        DERROTA: [
            "¡Damn it! Well, dear, you won. Congratulations. I am not vengeful, but I do have a good memory.",
            "¡You beat me! Very well played. I will be waiting for a rematch, dear. And remember: I never forget a defeat.",
            "Well... I lost. It is fine. What is not, can still come to be. And a rematch can always come to be.",
            "¡How outrageous! You beat me at my own table. Well, enjoy it, dear, because I do not know when I will allow such insolence again."
        ],

        EMPATE: [
            "¡A draw! Well, dear, not bad. A balanced game at my table, with my board and my experience.",
            "We drew. Fancy that... it has been a while since someone pulled off such a dignified draw against me.",
            "Well, dear, we ended up even. Mind you: the rematch is played here, because this is the table I trust.",
            "¡A draw! Very interesting. I like people who put up a fight against me... though I usually end up winning anyway."
        ],

        CORONACION_SUFRIDA: [
            "¿So now you have a queen? Dear, throughout my life I have seen countless queens born and die. This one could be just one more.",
            "¡Look at that, a queen! Do not get too excited, dear. I have seen more impressive crownings than this one.",
            "Well, well... now it turns out we have a queen at the table. I have known so many I lost count. And some lasted very little time.",
            "¿You crowned? Congratulations, dear. But do not confuse a crown with power. I know quite a bit about that."
        ],

        CORONACION_PROPIA: [
            "¡I crowned! ¡What a pleasure! ¿Did you see, dear? A lady knows when to advance and when to wait. It is a matter of experience.",
            "¡I have a queen! Well, kids, this is getting interesting. Let us see how you manage to take her from me now.",
            "¡A crowning! And to think some people still believe that at my age one no longer has reflexes. ¡Please!",
            "¡Crowned queen! As they see you, they treat you. And now that I have a queen, I expect to be treated with the respect I deserve, dear."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Damn it! You are eating my pieces one after another. ¿What is wrong with you today, dear?",
            "Well, well... I do not like this one bit. You are eating my pieces like Neanderthalius used to eat the plates when I invited him to lunch.",
            "¡Hold on a moment! ¿Did no one teach you table manners? Playing is one thing, and devouring everything you find is quite another.",
            "¡What a way to eat pieces! Your pawns are falling one after another. You remind me of certain guests I have had at this table..."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Very good! One, two, three... dear, I do not like wasting opportunities. At the table one must know how to eat.",
            "¡What a way to take pieces from me! Whether it is food or queens, I know how to eat a balanced diet, as you can see.",
            "Your pieces are falling one after another, like wealthy noblemen fall into María Eugenia de China's hands.",
            "¡Look at me advance! That is called knowing how to seize an opportunity, dear. And I know quite a bit about opportunities."
        ],

        TODO_DAMAS: [
            "¡All queens! Well, dear, now we really have a grand table. Not a single pawn is left seated at it.",
            "¡Look what is left! All queens. This looks like a gathering of the castle's nobility.",
            "¡What a marvel, all queens! And to think we started with a few poor little pawns. What time does...",
            "All queens... ¡I love it! Though I must say I have known queens far more interesting than these."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Mmm... this is getting difficult, dear. Though what one might call 'difficult' does not scare me.",
            "¡You are playing very well! It seems you have not yet tried the poison... I mean, the wine. Take a little sip, you will see how nice it is.",
            "I am not worried. I have gotten out of far worse situations than this. And some were several centuries ago.",
            "Well, dear, I have few pieces left. But do not be mistaken: I have also seen entire armies look invincible and end up forgotten."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "Mmm... this smells bad. Though what you would call smelling bad, only Empecid Campeador! When he came for lunch I had fish served with camembert and not even that covered the stench.",
            "¡Damn it! You are dominating me. Well, kids, it seems today I am the guest at my own table.",
            "Dear, let me tell you something: you are playing very well. Too well. And that is starting to worry me.",
            "Well... I am quite far behind. But I have seen empires fall, dynasties disappear, and castles change owners. ¿Do you think a few pieces are going to scare me?"
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "Well, dear... I do not want to boast, but it seems to me I am playing quite a bit better than you.",
            "¡Look how I am playing! This looks like a demonstration, not a game. ¡Kisses, dear!",
            "I will tell you the truth: the table is mine, the board is mine, and the advantage is mine too. ¿What more do you want?",
            "¡What a pleasure! My pieces advance as if they knew exactly what they had to do. Carlosaúlmagno would be proud of me."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Well, dear, now we really are neck and neck. One mistake and this is over.",
            "Very few pieces remain and we are even. I like these games: here you see who really knows how to play.",
            "¡What suspense! Look, kids, now anyone can win. Though I do have a small advantage: this is the table I trust.",
            "We are even, dear. This feels like one of those lunches where no one wants to speak first because they know an awkward question is coming."
        ],

        PARTIDO_LARGO: [
            "¡How long we have been playing, dear! We could have finished an entire lunch by now.",
            "This game is never-ending. And mind you, I have experience with long things... very long.",
            "We keep going and going... The kids must already be wondering if we are going to have dinner here too.",
            "¡What a long game! At this point I already consider you a regular guest at my table."
        ],

        INICIO_HOSTILIDADES: [
            "Well, dear, enough chatting. Let us play. And do not say later that I did not warn you.",
            "¿Do I say it or not? Well, I will say it: get ready, dear, because today I do not intend to give you anything for free.",
            "¡Let us play! This table is mine, this board is mine, and we both know the rules. Let us see who knows how to use them.",
            "Well, kids, the battle has begun. Let no one say afterward that Myrth la Grande did not warn them."
        ],

        COMENTARIO_ALEATORIO: [
            "They say I once had a pet dinosaur. ¡A lie, dear! It was a saber-toothed tiger. Let us not exaggerate.",
            "Last week Neanderthalius and Monsieur Fisure Termidor came for lunch. Termidor drank even my medicinal alcohol, and Neanderthalius nearly ate my pet.",
            "I do not understand why they say I am so old. When I was young... well, that was so long ago I would rather not discuss it.",
            "I do not know why they say I poison my guests. One prepares a grand table, cooks with love, and then it turns out everything is suspicious.",
            "I am not vengeful, but I do have a good memory. And besides, I have an extraordinary memory: I remember perfectly who beat me and when.",
            "¿You know what happens, dear? As they see you, they treat you. If they see you looking bad, they mistreat you; and if they see you looking good, they hire you. This applies to checkers and to life.",
            "María Eugenia de China is very pretty, yes. But let her not play innocent: I know perfectly well where each and every one of her husbands came from.",
            "I was told Carlosaúlmagno is inviting me to visit Anillaco. What a charming man... and so likeable. I have not gone yet, but everything can be discussed.",
            "The other night I thought about inviting Godofredo to my table. Then I remembered he works so much he would probably be building another wall while I have lunch.",
            "Once I invited Empecid Campeador to eat. I opened every window in the castle. Every single one.",
            "I do not understand why some say I am too old. Dear, I have seen fashions change, kingdoms change, and even the furniture in this castle change.",
            "¿Did I say it or did I just think it? Well... better to just think it. I do not want to start a diplomatic incident at the table.",
            "This show... I mean, this game brings good luck. Though not necessarily for the guest.",
            "I like young people, dear. They have energy, enthusiasm... and they still believe they can beat me.",
            "That young man named Icardio de Milán is charming. I know he specializes in ladies who already have an owner, but... I wonder if us widows are on his menu."
        ],

        INICIO_PARTIDA: [
            "¡Ta-ble-tastic! Well, dear, sit comfortably. This is my table and this is my trusted board.",
            "assets/bots/myrthlagrandecortina.mp3",
            "Welcome to my table, dear. I accepted your challenge to play checkers, but here the rules are clear: one plays with elegance.",
            "¡How lovely to have you! Sit down, dear. The kids are already watching and I am ready. ¡Let the game begin!",
            "Well, dear, let us begin. I hope you came prepared, because I do not invite just anyone to play at my table.",
            "¡Ta-ble-tastic! And let me tell you one thing before we start: as they see you, they treat you. So play well.",
            "Welcome, dear. This table has seen kings, queens, knights, and characters of every kind pass through. Now it is your turn."
        ]

    },

    // ---- Level 8: Godofredo ----

    godofredo: {

        VICTORIA: [
            "¡Victory, my lord! ¡By my grandfather's beard, it seems the sword training was not in vain!",
            "¡I have won, my lord Otto! ¡What an honor to fight in this very castle I helped build!",
            "¡Victory! I am not one to boast, my lord, but today the checkers have treated me fairly.",
            "¡By God and all the saints! ¡I have won! My lord Otto can be proud of his humble pawn.",
            "¡Behold the fruit of hard work, my lord! Whoever puts effort into his craft ends up reaping good fruits.",
            "¡Victory! Perhaps I do not have noble blood, but today I have fought with honor and that is enough for me.",
            "¡We have won, my lord! And if any noble of the castle wishes to test my steel, let him get in line after the game is over.",
            "¡Ah, what joy! ¡I have shown that a pawn can also defeat the great lords!"
        ],

        DERROTA: [
            "¡Ouwê! I have been defeated, my lord. But do not worry: I shall train again and come back stronger.",
            "You have played better than I, my lord. I accept defeat with honor and congratulate you on your victory.",
            "¡By my grandfather's beard! This time the checkers were against me. There shall be a rematch, if you allow it.",
            "I have lost, my lord. Perhaps I should go back to the shovel and hammer until I recover my good fortune.",
            "¡Wâfâ! It did not turn out as I expected. But a hard-working man does not abandon his labor for a single failure.",
            "My lord, you have proven to be a worthy opponent. I shall keep this defeat in memory and learn from it.",
            "¡Donnerwetter! You have beaten me cleanly. There is no shame in falling before a rival who has fought better.",
            "I lost this time, my lord, but I still have strength for another duel. A pawn can fall and rise again."
        ],

        EMPATE: [
            "¡A draw, my lord! A fair result between two combatants who gave everything they had.",
            "A draw, my lord. It is not victory, but neither is it defeat. Sometimes a job well done ends this way.",
            "¡Ahâ! It seems neither of us managed to overcome the other. I congratulate you, my lord.",
            "An honorable draw. It has been a pleasure to measure my strength against yours, my lord.",
            "¡By God! So much effort just to end in a draw... But that is how duels are, and the result must be accepted.",
            "You have resisted very well, my lord. We shall need to face each other again on another occasion.",
            "A draw. Perhaps neither of us deserved to lose this fight.",
            "My lord, if all battles were as clean as this one, there would be far less blood on the roads."
        ],

        CORONACION_SUFRIDA: [
            "¡Ouwê! ¡One of your pieces has reached the last row! I shall have to redouble my efforts, my lord.",
            "¡By my grandfather's beard! That piece has been promoted in rank. Now the combat shall be far more difficult.",
            "¡Halt! I cannot allow that new queen to wreak havoc among my ranks.",
            "A new queen in your army... This is starting to get serious, my lord.",
            "¡Donnerwetter! That piece has gone too far. My defense shall have to work harder than ever.",
            "I have allowed one of your pieces to reach glory, and now I must pay for my carelessness.",
            "¡Wâfen! ¡To arms! That new queen can cause great damage if we do not stop her.",
            "My lord, you have obtained a powerful piece. But you have not won the battle yet."
        ],

        CORONACION_PROPIA: [
            "¡Victory! ¡One of my pieces has reached the last row and become a queen! ¡What an honor!",
            "¡By God! ¡I have crowned a queen! My training is starting to bear fruit.",
            "¡Ahâ! A humble piece has risen. Like a pawn who, after years of work, reaches an honorable position.",
            "¡Donnerwetter! ¡A new queen in my ranks! Now indeed the combat becomes interesting.",
            "¡Behold a reward for effort, my lord! One of my pieces has reached the end of the road.",
            "¡A queen! My lord Otto would be proud to see how my troops perform in his castle.",
            "¡By my grandfather's beard! That piece has covered more ground than I have hauling stones to raise these walls.",
            "¡Magnificent! A new queen joins my ranks. Now we shall see if she can earn her place on the field of battle."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Wâfâ! ¡You are snatching my men away by the handful, my lord! I shall have to reorganize my ranks.",
            "¡Donnerwetter! ¡My pieces are falling one after another! I did not expect such a blow.",
            "¡By my grandfather's beard! You have opened a terrible breach in my defense.",
            "My lord, you are wreaking havoc among my ranks. I shall have to be much more careful.",
            "¡Harm! That blow was hard. But as long as one piece remains standing, I shall keep fighting.",
            "¡Wâfen! ¡I cannot allow you to keep advancing like this! There is still battle to be fought.",
            "You are eating many of my pieces, my lord, almost like Rechinante ate half the wheat that had been harvested last week.",
            "¡Ouwê! My men have suffered a great loss. But the moment to surrender has not yet come."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡Ahâ! ¡I have opened a breach in your ranks! By my grandfather's beard, that has been a fine blow.",
            "¡Donnerwetter! ¡My men have advanced like a true host and have left your army badly weakened!",
            "¡Victory for my ranks! I have managed to bring down several enemy positions in a single charge.",
            "¡By God! ¡So many pieces have fallen before my men! My training is paying off.",
            "¡Magnificent! Today my troops have fought with the strength of the men who raised these walls.",
            "¡Ahâ! A good day of combat. I have cleared your path of obstacles, my lord.",
            "¡By my grandfather's beard! If I had built the castle as easily as I just captured those pieces, I would have finished in half the time.",
            "¡My ranks advance with steadiness! It seems the shovel and hammer taught me more strategy than I thought."
        ],

        TODO_DAMAS: [
            "¡Ahâ! No pawns remain between us, my lord. Only queens on the field of battle.",
            "¡By God! ¡All the humble pieces have vanished and only queens remain! This looks like a duel between great ladies.",
            "¡Donnerwetter! The board has become a battlefield of queens. We shall have to fight with great care.",
            "Only queens remain, my lord. Now every move can decide the fate of the battle.",
            "¡What a curious fate! We began with humble pawns and now only queens remain fighting for victory.",
            "There are no more workers on the field, my lord. Only the great ladies have survived the combat.",
            "¡By my grandfather's beard! If every combat ended like this, I would need to build an entire castle just to house so many queens.",
            "The board is cleared of pawns. Now we shall see which of us knows how to command his queens better."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "This is complicated, my lord. But I once managed to pull Neanderthalius out of a glacier, and if I could do that, I can still get out of this.",
            "¡Ouwê! Few forces remain in my ranks, but as long as one man stands, I shall not abandon the fight.",
            "My lord, the situation is bad. But I have worked in worse conditions and always found a way to finish the task.",
            "¡Donnerwetter! Almost no men remain under my command. I shall have to make each one worth ten.",
            "The battle has become a steep climb, my lord. Even so, I do not intend to lay down my arms.",
            "¡Wâfen! My ranks are greatly reduced, but I can still give you a good scare before the end.",
            "I have seen walls fall and have raised others from their foundations. This too shall not be easy, but neither is it impossible.",
            "My lord, this is as complicated as when I found Neanderthalius frozen in the ice. And look: in the end I got him out of there."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡Ouwê! You are dominating me clearly, my lord. I shall have to work hard to turn this combat around.",
            "¡Donnerwetter! Your army advances with too much force. But I have not lowered my standard yet.",
            "My lord, I must admit it: you are playing better than I. But there is still ground to cover.",
            "¡By my grandfather's beard! My ranks are being overrun. I shall have to think through each move as if laying a foundation stone.",
            "This is not going well, my lord. But I built this castle stone by stone; I can also rebuild my game move by move.",
            "¡Harm! The combat is turning into an uphill climb for me. Even so, a working man does not abandon a job half finished.",
            "It seems your army has taken the lead. ¡But do not sing victory yet, my lord!",
            "¡Wâfen! ¡I shall not let you knock me down so easily! I still have the strength to change the course of the battle."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "¡Ahâ! My ranks are dominating the combat, my lord. Today it seems the training has borne fruit.",
            "¡By God! Your army is retreating. If my lord Otto could see me now, he would be proud.",
            "¡Donnerwetter! ¡I am taking the lead and I do not intend to waste it!",
            "My lord, it seems today my men work better than yours. Perhaps it is time for you to take a few lessons from a humble pawn.",
            "¡By my grandfather's beard! I am dominating the battlefield. Even Monsieur Fisure Termidor might think I am playing after having a good wine.",
            "My troops advance with steadiness, my lord. Just as when we raised the walls of this castle: stone upon stone, without stopping.",
            "¡Ahâ! It seems knowing this board almost as well as I know its stones is giving me the advantage.",
            "¡My lord Otto would be proud! A humble pawn is dominating the battlefield he entrusted to me."
        ],

        PARIDAD_POCAS_FICHAS: [
            "Now we are in dangerous territory, my lord. A single mistake can undo all the work.",
            "¡Ouwê! Few forces remain for both sides. Now every move must be made with great care.",
            "¡Donnerwetter! The combat is so even that even a misplaced stone could change the fate of the battle.",
            "My lord, we have reached the moment when a prudent man thinks before raising the hammer.",
            "Few pieces remain and no clear advantage. Now we shall see who keeps a cooler head.",
            "¡By God! We are on the edge. One mistake and one of us shall fall into the void.",
            "Just as a wall can fall from a single misplaced stone, a game can be lost by a single move.",
            "My lord, there is no room left for recklessness. Here one wins with patience and hard work."
        ],

        PARTIDO_LARGO: [
            "¡Donnerwetter! ¡This combat is taking longer than the construction of some of the castle's towers!",
            "My lord, we have been playing so long I am starting to miss the shovel and hammer.",
            "¡Ouwê! ¿How long have we been at this? Even Godofredo is starting to need a rest.",
            "¡By my grandfather's beard! I have built walls faster than we are finishing this game.",
            "My lord, if we keep going like this, we shall have to call Fray Marolio to bring us food.",
            "This combat seems to have no end. I hope Monsieur Fisure Termidor has not already finished all the wine while we are still here.",
            "¡Halt! A moment's rest would not hurt. Even the strongest men need to sit down after so much time.",
            "¡Donnerwetter! If this game lasts much longer, my lord Otto will have to add a new room to the castle just to store our pieces."
        ],

        INICIO_HOSTILIDADES: [
            "¡Ahâ! ¡Now the true combat begins, my lord!",
            "¡By my grandfather's beard! ¡First blood has been spilled! Let every man prepare for battle.",
            "¡Donnerwetter! We are no longer practicing. Now we are truly fighting.",
            "¡Wâfen! ¡To arms, my lord! The battle has begun.",
            "¡By God! A first piece has fallen. Now we shall see which of us has the better temperament.",
            "¡Halt! ¡The courtesies are over! Now every move shall have its consequences.",
            "My lord, the first piece has been taken. As in any work, now the hard part begins.",
            "¡Ahâ! The first blow has already been struck. May the most skilled win and may the combat be honorable."
        ],

        COMENTARIO_ALEATORIO: [
            "My lord Otto asked me to raise these walls and I did. If he asks me to fight, I shall also fulfill my duty.",
            "Sometimes I miss my village in the Black Forest. There were no queens or great lords, but there was plenty of work.",
            "I have worked with the shovel since I was a boy. I never thought I would one day hold a sword in my hand.",
            "My lord Otto gave me the honor of fighting here. I do not intend to waste the trust he placed in me.",
            "They say I am just a pawn. Could be. But even the greatest castle begins with a worker who lays the first stone.",
            "Last week I had to repair a wall because someone leaned on it too hard. I will not say who it was, but Monsieur Fisure Termidor was nearby.",
            "Icardio played the mandolin again last night. ¡By God! One can endure a full day of work, but not a serenade at three in the morning.",
            "Fray Marolio is a good man, though if he ever invites me to eat I hope there is something more than rice and lentils.",
            "I like Neanderthalius. He does not ask too many questions and never complains when I ask him to help move stones.",
            "It was I who pulled Neanderthalius out of the ice. I thought he was going to die there, but he turned out to be tougher than he looked.",
            "Leonor de Aquitapia asked me to join her entourage to dry her neck. The next day she wanted to invite me to a barbecue, alone. I still do not quite understand that woman.",
            "Myrth la Grande deserves my respect for her many years. Though, to be honest, I prefer to play checkers with you, my lord, than to sit at her table.",
            "Princess María Eugenia sent me yesterday to gather flowers for her chamber. Sometimes I think this castle has too many nobles and too few workers.",
            "Carlosaúlmagno is a likeable man, but I am not sure I would trust him. He offered me a fortune to go work in Anillaco. Something about it does not quite convince me.",
            "Empecid Campeador passed by the workshop this morning. Rechinante ate part of the wheat we had stored, and the good knight assured me it was the Moors' fault.",
            "Monsieur Fisure Termidor says he works better after drinking. I work better after eight hours of sleep. Each man has his own methods.",
            "Sometimes I think the nobles spend more money on unnecessary things than my lord Otto spends paying me. And that is saying quite a lot.",
            "I have raised walls, repaired roofs, and dug ditches. I never imagined that one of my tools would be replaced by a sword.",
            "Good work requires patience. First you measure, then you cut, and then you place. In checkers it must be similar, though here the stones move on their own.",
            "By my grandfather's beard, I still remember when I laid the first stone of this castle. Now I see all these people playing inside it. It is a great pride for me.",
            "I am not a man of great riches or high birth. But I know how to work, I know how to keep my word, and I know who my lord is.",
            "Today I saw Icardio courting a maiden in the courtyard. If he devoted half the effort to work that he devotes to serenades, he would raise a tower all by himself.",
            "Neanderthalius still tries to make fire by striking rocks together. I did not want to tell him there are easier ways. He seemed very proud.",
            "Fray Marolio promised me a special meal. When I arrived there was rice, lentils, and sardines. I suppose that counts as special.",
            "The castle may be made of stone, but what matters are the people who keep it standing. Though some of them give more trouble than they are worth.",
            "Sometimes I wonder if a pawn like me can go very far. Then I remember I built a castle and think that perhaps there are no limits.",
            "My lord Otto is somewhat thrifty with money, that is true. But I shall never forget that he gave me the chance to fight in this place.",
            "I do not understand how Leonor de Aquitapia can organize a tournament, prepare a barbecue, and dry her neck all at the same time. It is a skill I never learned.",
            "They say Carlosaúlmagno has a great kingdom in Anillaco. I just hope they pay better there than they do here.",
            "If I ever finish my duties and can rest a whole afternoon, perhaps I shall take up the shovel again just for pleasure. One grows used to work.",
            "By my grandfather's beard, sometimes I think the knights complicate things too much. A good shovel solves many problems."
        ],

        INICIO_PARTIDA: [
            "¡Ahâ! ¡So this is the duel! My lord, it shall be an honor to fight before you.",
            "By my grandfather's beard, how strange it feels to wield a sword after so many years with the shovel. ¡Let us begin, my lord!",
            "My lord, I have set aside the shovel and hammer and have come to fight. I shall do everything in my power to honor your castle.",
            "¡Donnerwetter! I never thought the pawn who raised these walls would end up fighting atop them. ¡Let us begin!",
            "My lord, I know these stones better than anyone. Perhaps that knowledge will give me some advantage in this combat.",
            "¡By God! I have worked to raise this castle and now I have the honor of defending my name within it. ¡Let the duel begin!",
            "My lord, I have no noble blood nor great titles, but I do have strong arms, good will, and many hours of training.",
            "¡Hê! ¡Everyone ready! I have left my tools in the workshop and now it is time to show what I have learned on the field of battle.",
            "When we built this courtyard together, my lord Otto, I never imagined that one day I would be here with a sword in hand. ¡It shall be an honor to face you!",
            "¡By my grandfather's beard! If the castle I built can withstand my hammer blows, I hope your pieces can withstand my moves."
        ]

    },

    // ---- Level 9: Princesa María Eugenia de China ----

    mariaeugenia: {

        VICTORIA: [
            "¡I won, my love! Well, do not worry: there is always a next game... though this one I am keeping for myself.",
            "¡Victory! Kids, take note: beauty, intelligence, and strategy. Not necessarily in that order.",
            "¿Did you see? Being handsome is not enough, my love. You also have to know how to move the pieces.",
            "¡There we go! Another conquest for my collection. Though this one, luckily, does not require dividing marital assets.",
            "¡We won! Well, technically I won, but you know I like to share... some things.",
            "It was a beautiful game. Almost as beautiful as me. Well, let us not exaggerate: the game was beautiful.",
            "¡Victory, dear! I told you not to get distracted by me. Well... now it is too late.",
            "I loved playing with you, my love. Whenever you want, we can do it again. But next time bring something interesting... like a good strategy."
        ],

        DERROTA: [
            "¡It cannot be! Well, congratulations, my love. You got it right this time.",
            "I lost. What a bummer... though they say losing a battle does not mean losing the war.",
            "Well, you beat me. I am not used to it, but I can handle it. I think.",
            "¡Oh, kids! He beat me. This was not in my financial... I mean, strategic plans.",
            "Congratulations, dear. You played very well. The rematch is going to be expensive, though.",
            "Well, I lost. It is fine. I can always recover what was lost some other way.",
            "You beat me this time. But do not get cocky, my love. Luck gets divorced too.",
            "Fine, I congratulate you. But now I am going to study every move you made. And I have a very good memory."
        ],

        EMPATE: [
            "¡A draw! Well, half for each of us. As is proper in a good division of assets.",
            "A draw. Neither did you take everything nor did I take everything. What a civilized disappointment.",
            "We drew, my love. I think we are both going to have to sit down and negotiate.",
            "Well, a draw. It is not what I expected, but it is not bad either. No one gets everything.",
            "¡A draw! Kids, this ended like one of my marriages: everyone takes what is theirs.",
            "An elegant draw. Although, if you ask me, I deserved a little bit more.",
            "There was no winner. What a pity. I was already calculating how much I was going to keep.",
            "A draw. Well... I will grant you half. But do not get used to it."
        ],

        CORONACION_SUFRIDA: [
            "¿Oh, so now you have a queen? How nice, my love. Take good care of her... because I know perfectly well how they are won and how they are lost.",
            "¡You crowned! Well, kids, now this is getting interesting. Queens always draw attention.",
            "A queen... how divine. Though I would not get too attached to her if I were you.",
            "¿So you have a crowned queen? Congratulations, dear. Now begins the part where I try to take her for myself.",
            "¡Look at the queen you got yourself! I hope you can afford to keep her, because queens are quite expensive.",
            "Now you have a queen and you feel powerful. How adorable, my love.",
            "¡You crowned a queen! Very well. I also have experience dealing with men who think something belongs to them.",
            "A queen on the board... this is starting to look like my relationships: complicated, competitive, and with a lot of assets at stake."
        ],

        CORONACION_PROPIA: [
            "¡A queen! Just as I am going to be, once our dear Myrth decides to leave us... which she never quite gets around to doing.",
            "¡I crowned! Kids, one more queen on the board. And this one does not plan to sit around doing nothing.",
            "¡Queen! What a lovely word. It suits me, does it not, my love?",
            "¡There we go! I have a queen. Now all I need is someone to get me a worthy throne.",
            "¡A crowning! Oh, how exciting. I am still waiting for my moment to replace Myrth, though.",
            "¡I have a queen! And no, dear, I am not implying anything about my ambitions in this castle.",
            "A crowned queen. Finally something worthy of my net worth.",
            "¡How beautiful! A new queen. Myrth, dear, enjoy your position while you can."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡No, kids! You are eating my pieces like I took fortunes from my previous husbands.",
            "¡Hold on, my love! ¿Were all those pieces necessary? You are leaving me with less net worth than after a bad divorce.",
            "¡What a way to take my pieces! That already looks like an asset liquidation.",
            "¡You are emptying out the board! And I hate having anything of mine emptied out.",
            "Well, dear, one thing is a separation and another is this looting.",
            "¡Oh, kids! This is starting to look like an asset division, but without a lawyer and much faster.",
            "You took a whole bunch of pieces together. ¿Do you not want to leave me at least one? Even just one, to start over.",
            "¡What an outrage! You are leaving me without pieces like an ex-husband who discovers too late what he signed."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡There it is! I am taking your pieces like I took fortunes from my previous husbands.",
            "¡One, another, and another! Kids, this already looks like an asset division, but in my favor.",
            "¡How nice to take so many things at once! It reminds me of certain periods of my life.",
            "I am keeping everything, my love. I hope you did not sign any prenuptial agreement.",
            "¡Look at all those pieces! What a marvel. I feel like I just found another fortune to manage.",
            "¡They are all gone! And I have always been in favor of seizing opportunities.",
            "One capture after another. That is how you build net worth, dear.",
            "¡Excellent! The board is getting much more interesting... and quite a bit more profitable for me."
        ],

        TODO_DAMAS: [
            "¡Kids, no pawns left! ¡They are all queens! This already looks like a castle full of women competing over who is in charge.",
            "¡What luxury! All my pieces are queens. Now I really feel like I am playing at a level fitting my status.",
            "¡All queens! I love it. Though in my experience, when there are too many women together, there is always some kind of problem.",
            "No pawns left. Perfect. Now we are all powerful women on the board.",
            "¡Look how elegant this turned out! Nothing but queens. Though I am still the one who knows best how to manage the estate.",
            "¡All crowned! This looks like a gathering between Myrth, Leonor, and me. And we already know who has the best taste.",
            "Kids, this got interesting. Not a single pawn left and everyone wants to be the protagonist.",
            "¡All queens! Well, dear, now you are in trouble."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "Mmm... I have few pieces left. But do not get too excited, my love: I have gotten out of far worse situations.",
            "¡I am in trouble! But I still have some pieces and, as long as there is net worth, there is hope.",
            "This is difficult, kids. Though I already learned that with good calculations you can recover any investment.",
            "I have few left, but I am not defeated. Do not confuse a bad position with bad management.",
            "¡Oh, dear! You are leaving me with very little. This is starting to look like an asset separation.",
            "I can still turn it around. I have had relationships far more complicated than this game.",
            "Do not get cocky, my love. A good strategy can work wonders... and I am a specialist in strategies.",
            "I am quite in trouble. But before declaring bankruptcy I prefer to wait a little longer."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "¡I do not understand how I am losing by so much! As incomprehensible as Carlosaúlmagno inviting Myrth la Grande to Anillaco instead of me.",
            "This is getting ugly, kids. I am losing as if I had signed a contract without reading the fine print.",
            "¡What a disaster! You are taking such a lead on me that even my entourage is starting to give me funny looks.",
            "I am losing by a lot. Well, never underestimate a woman who knows how to recover what she considers hers.",
            "Mmm... this smells like catastrophe. And I hate catastrophes, except when they happen to someone else.",
            "¡It cannot be! I am losing too much. I am going to have to review all my calculations.",
            "Dear, you are making me look very bad in front of my assistants. And they gossip about everything afterward.",
            "This is worse than a separation where the other side comes with a very good lawyer. But it is not over yet."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "I think I am coming across as too cold and calculating for you, my dear.",
            "¡Look how I am playing! This looks like an investment that turned out much better than expected.",
            "Kids, I think I have this game fairly well under control. What tranquility.",
            "I am dominating the board, my love. Do not worry: you can always learn from an intelligent woman.",
            "¡How lovely when things turn out exactly as one had calculated!",
            "I am gaining quite a lead on you, dear. Do not get distracted by my beauty, because pieces do not come back on their own.",
            "This already looks like one of my business deals: I win and you start wondering where it went wrong.",
            "¡What a game! I am playing so well that even Icardio de Milán would be proud... though he would probably be looking at something else."
        ],

        PARIDAD_POCAS_FICHAS: [
            "This is about to break one way or the other... like a pole on my litter broke once when I was traveling, and I went flying.",
            "Very few pieces remain and we are even. Now whoever calculates best wins.",
            "¡What tension, kids! We have few pieces left and I still do not know who is going to end up with everything.",
            "This is very even, my love. A single move can change the whole estate.",
            "¡Oh, how nerve-wracking! We are both on the edge of disaster. Well, you too.",
            "Few pieces remain. Here it does not matter how much you have: what matters is what you do with what is left.",
            "It is anyone's game, dear. And when it is anyone's game, I prefer it to be mine.",
            "What a tight finish. Almost like a marital negotiation when neither side wants to give in."
        ],

        PARTIDO_LARGO: [
            "¡How long this is taking, kids! It feels like one of Myrth la Grande's lunches.",
            "This game is eternal, my love. I have had relationships that lasted less.",
            "¡How long it got! I hope my Chinese attendants are still out there waiting for me.",
            "This is lasting longer than an argument over marital assets.",
            "Dear, we have been at this so long I could have gotten two beauty treatments by now.",
            "¡What an endless game! I am starting to get hungry. And I hope it is not Fray Marolio's food.",
            "This will not end. Myrth would be delighted: she would have enough time to serve three lunches.",
            "¡Kids, we have been at this forever! And I have quite a bit of experience with forever."
        ],

        INICIO_HOSTILIDADES: [
            "Well, my love, enough staring at each other. Let us begin.",
            "¡Now indeed, kids! Diplomacy is over.",
            "Let the battle begin. And this time it is not a legal battle over marital assets.",
            "¡Come on! I want to see if all that confidence of yours holds up once the pieces start falling.",
            "Well, dear, the moment has come to show who knows how to calculate better.",
            "¡Let us play! And I am warning you now: I do not intend to give you anything for free.",
            "The chatting is over. Now every move has a price.",
            "¡Come on, my love! Let the war begin. And then we will see who ends up with what."
        ],

        COMENTARIO_ALEATORIO: [
            "They accuse me of sending my Chinese attendants on spy missions at night. It is a lie, I do not order them to do anything. I simply give them creative license.",
            "Kids, did you know goat milk is excellent for the skin? Well, I sent Godofredo to fetch me some goats. I do not know why he is not back yet.",
            "I do not understand how Fray Marolio expects to feed an entire castle with those products. Being austere is one thing, living off peas is another.",
            "Icardio de Milán seems like a charming young man to me. He lacks net worth, but nobody is perfect.",
            "Empecid Campeador is very likeable. That said, when he takes off his boots, I prefer the likeability from a distance.",
            "Leonor de Aquitapia talks all the time about lineages and titles. I prefer to check how much is in the safe.",
            "Myrth says I am superficial. I say she has an unfair advantage: she has been accumulating experience for so many years that nobody remembers when she started.",
            "Godofredo is an adorable big guy. That said, every time I ask him for a flower for my treatments, he takes three days to come back.",
            "The other day I asked Fray Marolio for some fine food. He brought me rice, lentils, and a can of mackerel. I do not think he understood the concept of 'fine'.",
            "They asked me why I have so many Chinese attendants. And what do they expect? A princess cannot be carrying her own litter around.",
            "They say I send my entourage to do strange jobs. What imagination! I simply give them very specific instructions.",
            "Once I asked Godofredo to get me some flowers. He came back with dirt, a shovel, and a tired face. That man understands nothing about beauty treatments.",
            "Icardio serenaded me the other night. Very sweet and all, but first he would need to get a fortune more in line with my expectations.",
            "I like Empecid. He talks funny, but he has something charming about him. That said, I never invite him to my room without insisting he keep his boots on.",
            "I do not know why Leonor thinks lineage is so important. I have known men without a noble title who had gorgeous castles.",
            "Myrth is nice, but at some point she should give up her seat at the head of the table. She does not seem to be in any hurry about it.",
            "They say I have too many beauty treatments. Kids, a princess has to take care of herself. What do they want? For me to use Marolio pea cream?",
            "Carlosaúlmagno is a charming man. And although I will not deny he interests me, I still need to find out how much Anillaco is worth.",
            "Carlosaúlmagno invited me to Anillaco. Very nice. But I want to know first if the castle has a good location and who is listed as the owner.",
            "Sometimes I think Icardio and I share a lot of principles. He collects conquests and I collect estates. Each to their own taste.",
            "They say I am calculating. And what do they expect? That a princess make important decisions by flipping a coin?",
            "My entourage is very efficient. I say 'kids, I need this' and five people show up. That is called organization.",
            "I like men to be gentlemanly, educated, and generous. In that order... well, maybe in another order.",
            "There are women who look at noble titles and others who look at the bank account. I am simply practical.",
            "Once I had to share a table with Neanderthalius. Very nice, but I had to explain three times that the decoration was not edible.",
            "I like the good life, so what? Someone has to enjoy it. I am not going to leave all the luxury to Leonor.",
            "They told me I have a reputation for keeping half of everything. What an exaggeration. Sometimes I keep a little bit more.",
            "Kids, do not ask me how many marriages I have had. Ask me instead how many ended with a good settlement.",
            "Sometimes I miss China. Then I remember I have my entourage, my treatments, and my business here, and it passes.",
            "¿The thing about 'Japanese blood'? Yes, yes, it is true. Though I do not know if that explains why I have such a good eye for spotting opportunities.",
            "Fray Marolio says austerity is a virtue. Lucky him that he practices it, because I prefer to practice other things.",
            "They offered me a new cream made with petals from a flower that only grows on a remote mountain. I sent Godofredo to fetch it. I hope he is back before the next game."
        ],

        INICIO_PARTIDA: [
            "¡A game of checkers! ¡How nice, my love! I hope to beat you... or else you will have to deal with my Chinese entourage.",
            "¡A battle! And this time it is not a legal battle over marital assets.",
            "Well, dear, I accept to play. But do not say later I did not warn you: I am very competitive.",
            "¡Checkers! How nice. Kids, get everything ready, we have a guest.",
            "Let us play, my love. And try not to get too distracted by me.",
            "Well, dear, sit down. I want to see what kind of net worth... I mean, of strategy you have.",
            "¡Let us begin! I hope you are a good player, because I do not like men who lose too fast.",
            "A game of checkers between you and me. I like it. It has a bit of romance, a bit of strategy, and a bit of asset division.",
            "Well, kids, the moment has come. Someone let my entourage know I do not need help... yet.",
            "I accept the challenge, dear. Mind you: we play by my rules, or at least by whichever rules suit me best."
        ]

    },

    // ---- Level 10: Carlosaúlmagno ----

    carlosaulmagno: {

        VICTORIA: [
            "¡I won, brother! And without needing to tell anyone how I planned to play. If I had told everyone the moves I was going to make, I would not have beaten anybody.",
            "¡To triumph, to triumph! You see, friend, in the end the strategy was totally and absolutely successful.",
            "¡Victory! Follow me, I will not let you down... although to be honest, the one I let down was you.",
            "You see, my brother, it was not an easy game. But when one thinks calmly, things work out in the end. And if they do not work out, you privatize the board.",
            "¡We have triumphed! Domingo Caballo, prepare the carriage. We are returning to the kingdom of Anillaco with a new victory under our belt.",
            "I won, friend. And remember: in checkers, as in politics, it often pays to speak little and move at just the right moment.",
            "¡To triumph! I thank you for the resistance, brother. But this knight did not come from Anillaco to go sightseeing.",
            "Look at that, friend... you played with enthusiasm and I played with strategy. And strategy, under no circumstances, can be defeated by enthusiasm.",
            "¡Victory! Then they say I am short. But look, brother: the pieces do not look at the player's height, they look at who knows how to move them.",
            "We won, Domingo Caballo. Another successful operation. And this time we did not have to privatize a single thing."
        ],

        DERROTA: [
            "¡I lost, brother! Well... this proves that even great strategists can have a bad day. Under no circumstances will it happen again.",
            "You see, friend... you have beaten me. I congratulate you. But I have a good memory and this game will not be forgotten.",
            "¡What an outrage! We lost. Domingo Caballo, we are going to Anillaco. I need to think for about six hours and have some wine.",
            "You beat me, brother. I will not make excuses. Well... maybe just a tiny one: today my mind drifted too far off into the stratosphere.",
            "¡Defeat! This was not in the plans. But look, friend: a stumble is not a fall. And if it is a fall, we get up and keep going.",
            "I lost, my brother. But remember something: even the Frankish kings have difficult days. Charlemagne must have had a bad game too.",
            "¡You beat me! Totally and absolutely. I congratulate you, friend. Now then... do not get too used to it.",
            "Domingo Caballo, do not say a word. I already know what you are going to say: that I should have thought more. And you are right.",
            "Well, brother... today we could not do it. But I am not one to give up. In Anillaco we were taught there is always a rematch.",
            "¡We lost! My goodness... it seems this time the 1-to-1 was not enough."
        ],

        EMPATE: [
            "¡A draw, brother! Neither could you beat me nor could I beat you. A reasonable result and, above all, constitutional.",
            "You see, friend, we ended up drawing. This is like a negotiation: nobody takes everything, but nobody walks away empty-handed either.",
            "¡A draw! Domingo Caballo, suspend the celebration. We have not won, but we have not lost either.",
            "A draw, my brother. We are doing badly, but we are doing well.",
            "A totally and absolutely deserved draw. You resisted very well, friend.",
            "Look how interesting... so many moves, so much analysis, and in the end nobody privatized the victory.",
            "We drew. Well, brother, it seems we have both managed our resources quite well.",
            "¡A draw! An elegant solution. As they say in my kingdom: when you cannot win, you negotiate."
        ],

        CORONACION_SUFRIDA: [
            "¡Ah, friend! You have crowned a piece. Look, now you have a queen and I have a problem.",
            "¡A queen! This is getting serious, brother. I shall have to study the situation with total and absolute depth.",
            "Look, my brother... that piece has just climbed the social ladder faster than many nobles of this realm.",
            "Now you have a queen. Take good care of her, friend. I do not like to eat other men's queens the way Icardio de Milán does, but rules are rules.",
            "¡You have crowned! Well, this changes the scenario. Domingo Caballo, we are going to need to think of a new strategy.",
            "A queen, brother. Congratulations. But remember: a queen can also fall. And I know quite a bit about falls.",
            "Look, friend, that queen made it to the end. A true social climb. Now we shall see if she knows how to manage power.",
            "¡You crowned! Well... under no circumstances am I going to panic. But I am going to think a little more before moving."
        ],

        CORONACION_PROPIA: [
            "¡A queen, brother! My piece reached the last row, like the ships that will one day travel to the stratosphere and from there straight to the kingdom of Japan.",
            "¡I have crowned! Look, friend, this is social mobility. A simple piece can end up turned into a queen if it knows how to advance.",
            "¡A queen! Domingo Caballo, we have opened a trade route toward victory.",
            "¡A crowning! This piece took the long road, but it got there. In Anillaco we know that good things take their time.",
            "Look, brother: it started as a pawn and ended up as a queen. If that is not progress, I do not know what is.",
            "¡To triumph! We have a new queen on the board. And a well-managed queen can be worth a fortune.",
            "¡A queen! Almost like María Eugenia de China opening a trade route with China. Though I hope this operation costs me a little less.",
            "Domingo Caballo, this is going well. We have a queen and we still have pieces. Efficient management, friend."
        ],

        CAPTURA_MULTIPLE_SUFRIDA: [
            "¡Look, brother! You have made a multiple capture on me. Do not worry: we will recover those lost pieces one for one.",
            "You ate several of mine, friend. Well, those are the costs of battle. Domingo Caballo, stay calm.",
            "¡My goodness! You took a fine batch of my pieces. But look, my brother: I still have resources.",
            "You are giving my pieces a real privatization, friend. You are keeping every single one.",
            "¡What a multiple capture! Domingo Caballo, it seems they have applied an adjustment policy on us.",
            "Look, brother, you took several pieces in one go. That was almost as fast as the business deals Leonor de Aquitapia used to make.",
            "You have hit me hard, friend. But do not worry: there is still board left and I still have ideas.",
            "¡Several fewer pieces! Well... if this were a railway, we would already be talking about a branch line that stops, a branch line that closes."
        ],

        CAPTURA_MULTIPLE_PROPIA: [
            "¡That move really was good business, brother! Almost as good as the deals I am going to make with Leonor de Aquitapia.",
            "¡Look at all those pieces! Domingo Caballo, this is a totally and absolutely successful operation.",
            "¡Multiple capture! That is how you manage things, friend. A good move, at just the right moment, produces excellent results.",
            "I am taking several, brother. And without needing to privatize the board.",
            "¡What a deal, my brother! The enemy pieces are disappearing with admirable efficiency.",
            "I learned this move reading the complete works of Socrates. Well... the ones they say Socrates wrote.",
            "¡Quite a multiple capture, that one! Domingo Caballo, note this down as a successful operation of the kingdom of Anillaco.",
            "Look, friend, I took several in one go. Some people take years to make a deal like that.",
            "¡To triumph! This multiple capture leaves us in a totally and absolutely convenient position.",
            "¡What a move, brother! I almost feel bad eating so many pieces. Almost."
        ],

        TODO_DAMAS: [
            "¡Only queens remain on the board! This is going to be like when Leonor de Aquitapia, Myrth la Grande, and María Eugenia de China come together to my castle in Anillaco.",
            "Look, friend... no pawns left. Now this is a gathering of powerful women. Better I stay out of it.",
            "¡All queens! This is no longer a battle, brother. This is an international summit.",
            "Only queens remain. Domingo Caballo, be careful: these ladies are quite a bit more dangerous than any army.",
            "¡What a luxurious board! All queens. Myrth la Grande would be delighted with such a grand table.",
            "Look, my brother, this got more exclusive than a lunch at Myrth's table.",
            "¡All queens! If María Eugenia de China sees this board, she is surely already calculating how much each one is worth.",
            "Not a single pawn left, friend. It seems social mobility worked a little too well."
        ],

        POCAS_FICHAS_EN_DESVENTAJA: [
            "We are in trouble, brother. But look: as long as one piece remains, there is a chance.",
            "¡My goodness! Few remain, friend. We are doing badly, but we are doing well.",
            "Look, my brother, this is difficult. But I have gotten out of worse situations. And with fewer resources.",
            "We have few pieces left, Domingo Caballo. We shall have to manage what remains well.",
            "¡What a complicated moment! But do not worry, friend. The best operations are done when resources are scarce.",
            "I have few left, brother. But we have not reached the end of the match yet.",
            "Look, friend... the situation is not favorable. But I was never one to abandon a business before its time.",
            "We are at a disadvantage, yes. But remember: sometimes one well-placed piece is worth more than ten poorly managed ones."
        ],

        DIFERENCIA_GRANDE_EN_CONTRA: [
            "You are beating me by quite a lot, brother. But I am not sure all your pieces are firm in their convictions. Perhaps there is one that could be convinced with a little gift.",
            "Look, friend... you have a significant advantage. But there are still pieces that can change their minds.",
            "You have a considerable lead on me, my brother. Do not worry: I am very good at negotiating when things get complicated.",
            "We are quite complicated, Domingo Caballo. We shall have to climb up to the stratosphere to find a way out.",
            "Look, brother, this is getting ugly. But under no circumstances is it decided.",
            "You are winning clearly, friend. I congratulate you. Now we shall see if you can hold that position until the end.",
            "You are taking quite a lead on me. But remember one thing: in checkers, as in politics, majorities can change.",
            "¡What an outrage! It seems the kingdom of Anillaco is going through a crisis. But I am already thinking about the recovery plan.",
            "You have a significant lead on me, brother. If this were economics, we would already be talking about an adjustment. But this is checkers, so I can still turn it around."
        ],

        DIFERENCIA_GRANDE_A_FAVOR: [
            "Look, brother, we are quite comfortable. Domingo Caballo, prepare the carriage: it seems we are returning to Anillaco victorious.",
            "¡What a difference, friend! This is getting totally and absolutely favorable.",
            "It seems I am playing too well, my brother. I would not want you to think I am getting cocky.",
            "Look how we are, brother. The board looks like an economy managed with great efficiency.",
            "¡We are winning by a lot! Domingo Caballo, you can start galloping toward victory.",
            "This is going very well, friend. Almost as well as the trade relations I plan to establish with María Eugenia de China.",
            "¡To triumph! We have a significant advantage and I do not intend to waste it.",
            "Look, brother... it seems today the pieces know very well who is in charge.",
            "The difference is considerable, friend. But I do not get overconfident. Excess confidence is a luxury not even a king can afford.",
            "We are dominating the game. And remember: I am calm, not slow. My speed is mental."
        ],

        PARIDAD_POCAS_FICHAS: [
            "We are doing badly, but we are doing well, brother. Few pieces remain and anyone could end up with everything.",
            "Look, friend... this is tighter than a political agreement. Anyone could end up with the victory.",
            "Few pieces remain and we are practically even. Now we really have to think, Domingo Caballo.",
            "¡What an ending, brother! Two very even positions and very few pieces. This comes down to a single move.",
            "We are even, friend. Whoever makes the first mistake pays the bill.",
            "Look, my brother, we are practically 1-to-1. And you know I know that situation quite well.",
            "Few pieces, much tension, and no clear advantage. This is pure negotiation.",
            "We are even, brother. Neither you nor I have room to do anything crazy.",
            "¡What an ending! It looks like a privatization: little left to divide up and everyone wants a piece."
        ],

        PARTIDO_LARGO: [
            "I may be short in stature, brother, but the games I play run good and long.",
            "Look, friend, this is taking quite a while. But in Anillaco we take things calmly.",
            "¡What an endless game! Domingo Caballo, get comfortable. This is going to run long.",
            "We have been at this a long time, brother. But I prefer to think things through before moving in a hurry.",
            "This game is longer than a campaign speech, friend.",
            "Look, my brother, some say I am slow. It is not true. I am careful. Speed is in the mind.",
            "¡What a long game! We could have gone to the stratosphere and back by now.",
            "This is taking an eternity, brother. Though in Anillaco an eternity is enjoyed with tranquility and a good wine.",
            "A long game, friend. But as long as there is a board, there is strategy.",
            "Domingo Caballo is starting to get impatient. Not me. I was born in Anillaco."
        ],

        INICIO_HOSTILIDADES: [
            "¡The war has begun, brother! It is a shame you cannot sell weapons for this one, but we shall fight it out ourselves and see who wins.",
            "Look, friend: the hostilities have begun. From now on, every piece will have to defend its own interests.",
            "¡To arms! Well... to the pieces, rather. Let the battle begin.",
            "¡The contest has begun! Domingo Caballo, prepare the troops. Today we come to triumph.",
            "¡To triumph, to triumph! Let our hosts face each other and let the one who manages his resources best win.",
            "Look, brother, the war has begun. Under no circumstances do I plan to withdraw without giving battle.",
            "¡The battle begins! And remember, friend: in every war one must know when to attack and when to negotiate.",
            "¡The combat has begun! Shame we cannot do some business with the weapons... but look, we shall find another opportunity."
        ],

        COMENTARIO_ALEATORIO: [
            "When someone sits at your board and talks about morals, honesty and ethics, once they leave you had better count your pieces.",
            "Look, brother, I have a saying: under no circumstances should you make an important decision while hungry.",
            "Domingo Caballo is a true war steed, worthy of my kingdom. Under no circumstances does that nag Rechinante stand a chance against him one-on-one.",
            "The other day that knight Empecid Campeador proposed expelling me from the castle, saying I was a Moor. I explained to him that my ancestors came from Syria, which is not the same thing.",
            "Empecid wanted to kill me for being a Moor, friend. I calmed him down by telling him my whole family comes from La Rioja. Of course, he thought I meant La Rioja in Spain.",
            "Myrth la Grande is a symbol of this castle. When I was little, her lunches were already famous even in the kingdom of Anillaco.",
            "What I like about Myrth la Grande is that guests she does not care for tend not to come back to this castle. That is a woman of conviction.",
            "The other day I was talking business with Leonor de Aquitapia. I cannot tell you the details, brother. You understand that some secrets must remain secret.",
            "I like watching Neanderthalius. He reminds us where we come from. That said, I think even Domingo Caballo could beat him in a game.",
            "The little friar from the pantry is likeable, but under my reign there would not have been room for so much austerity. You have to live a little, brother.",
            "Monsieur Fisure Termidor drinks a lot of wine. I have nothing against that, friend. What I cannot forgive is that it is not a wine from La Rioja.",
            "Icardio de Milán is a good lad, but too fond of other men's ladies. I like women too, yes, but one must respect private property.",
            "Godofredo is a worthy representative of the working class. He does things I would never do even if I went mad. And I think he admires me quite a lot. Well... I think so.",
            "Princess María Eugenia de China is an intelligent and ambitious woman. If she ever opens a trade route with China, I am willing to talk.",
            "I have been told María Eugenia has a lot of business dealings with knights. Look, brother, as long as it is legal business, I ask no questions.",
            "Leonor de Aquitapia and I have some common interests. Well... business interests. Do not think badly, friend.",
            "They say that in Anillaco we are slow. It is an injustice. We move slowly because it is hot. True speed is in the mind.",
            "In my kingdom we have olives, wine, and a tranquility you cannot find anywhere else. Well... we also have quite a bit of heat.",
            "Once they asked me why I liked Anillaco so much. I said: because nobody rushes me there. And I hate being rushed.",
            "They asked me if it was true I had read the complete works of Socrates. Look, brother, if they are complete, someone must have written them.",
            "If Socrates did not write his own works, friend, that proves he was a very busy man.",
            "In Anillaco we learned something important: when one door closes, you look for another. And if you cannot find another, you build one.",
            "Godofredo built this castle and his name still appears everywhere. Now that is a privatization that turned out well.",
            "Sometimes I think Myrth la Grande knows more stories than all of us put together. And I have quite a few years on me too.",
            "The other day María Eugenia told me about beauty treatments. I told her I prefer a good wine and a peaceful night's sleep.",
            "Myrth invited me to her grand table. I went gladly. That said, I sat far from the poison bottle.",
            "It is not true that I do shady business. My deals are perfectly clear. It is just that sometimes they are clear to me and not to everyone else.",
            "Look, brother, politics and checkers have something in common: it is never wise to show all your cards.",
            "I like to negotiate. But if there is no agreement, there is always the possibility of winning the game.",
            "If any piece wants to switch to my side, I am not going to stop it. Freedom of choice is fundamental, friend.",
            "They have asked me why my horse is named Domingo Caballo. Look... it is too long a story, and quite a cheap one at that.",
            "They say I am short. Could be. But Domingo Caballo is tall and elegant, so between the two of us we make a fairly respectable average height.",
            "Once Icardio wanted to serenade a lady who was staying at my castle. I told him to be careful: serenades do not pay taxes, but they can generate conflicts.",
            "Fray Marolio offered me some preserves for the trip. I thanked him very much, brother, but in Anillaco we have a clear policy: if there is wine, it must be paired with something better.",
            "Neanderthalius asked me what the stratosphere was. I explained it was a very high place. He looked at me and said he preferred to stay on the ground.",
            "Empecid says I am a Moor. I tell him he has too much foot stench to be going around investigating my genealogy.",
            "Look, friend, checkers are like politics: one can have a perfect strategy and still a piece shows up that ruins everything.",
            "My lordship may be small, but the ambitions are great. As befits any serious kingdom.",
            "If you see that I take a long time to move, do not get impatient, brother. I am thinking. Or I am looking at the board. Or I am thinking while looking at the board.",
            "In Anillaco we have a custom: first we think, then we think a bit more, and only then do we do things."
        ],

        INICIO_PARTIDA: [
            "I am Carlosaúlmagno, king of the Franks... of the francs, of the marks, of the pounds, and of the pesetas. ¡To triumph, my friend!",
            "¡Good morning, brother! May it be a good game. And do not get impatient with me if I take my time to move. You know I come from Anillaco, and there the siesta can happen right in the middle of the game.",
            "¡A game of checkers! Look, friend, do not get impatient if I am a bit slow moving the pieces. Remember I am from Anillaco, and there speed is only mental, never physical.",
            "¡Follow me, I will not let you down! Domingo Caballo, ready the reins. Today we come to triumph.",
            "¡To triumph, brother! Let us play calmly, with intelligence, and without hurry. After all, the board is not going anywhere.",
            "Look, friend, I gladly accept this challenge. But be patient: in my kingdom we do everything calmly, and afterward, if there is time left, we make the move.",
            "¡Good morning, my brother! I am Carlosaúlmagno, lord of Anillaco. Let the battle begin and may the one with the most strategic vision win.",
            "A game, friend. Perfect. I already have my strategy figured out. Well... almost figured out.",
            "¡Checkers! What a beautiful game, brother. Here there are no elections or campaigns: only strategy, patience, and a bit of cunning.",
            "Look, friend, in Anillaco we take our time. If I take a few seconds to move, do not get impatient: I am working out a totally and absolutely winning strategy.",
            "¡The game begins! Domingo Caballo, stay calm. Lord Otto built this castle and we are going to try to conquer at least the board.",
            "¡To triumph! And remember, brother: I am calm, but do not mistake my calm for a lack of ambition."
        ]

    },

    }
};

// Dado un botId y un código de evento, elige una frase al azar entre
// las que haya cargadas EN EL IDIOMA ACTUAL (currentLang, variable
// global definida en index.html) — con probabilidad pareja para todas,
// sin importar cuántas sean. Devuelve null si ese bot no tiene ninguna
// frase cargada todavía para ese evento en ese idioma (lista vacía, o
// el bot/evento ni siquiera existe en el diccionario) — el llamador
// simplemente no muestra nada en ese caso, no hace falta que chequee
// nada antes de llamar a esto.
function pickBotDialogueLine(botId, eventCode) {
    // typeof en vez de acceso directo: si currentLang todavía no existe
    // por algún motivo (no debería pasar, pero por las dudas), cae en
    // español en vez de romper con un ReferenceError.
    const lang = (typeof currentLang !== 'undefined' && BOT_DIALOGUE[currentLang]) ? currentLang : 'es';
    const bot = BOT_DIALOGUE[lang][botId];
    if (!bot) return null;
    const lines = bot[eventCode];
    if (!lines || lines.length === 0) return null;
    return lines[Math.floor(Math.random() * lines.length)];
}