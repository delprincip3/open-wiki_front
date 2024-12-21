import { Article, FeaturedArticle } from "@/types";

// Funzione helper per generare una data casuale degli ultimi 30 giorni
export const getRandomRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

export const mockFeaturedArticle: FeaturedArticle = {
  title: "La Storia dei Dinosauri: Un Viaggio attraverso il Mesozoico",
  excerpt: "Un'esplorazione approfondita dell'era dei dinosauri, dalle ultime scoperte paleontologiche alle nuove teorie sulla loro estinzione...",
  content: `I dinosauri dominarono la Terra per oltre 160 milioni di anni, creando uno dei capitoli più affascinanti della storia del nostro pianeta. 
    La loro era, il Mesozoico, si divide in tre periodi principali: Triassico, Giurassico e Cretaceo, ognuno caratterizzato da forme di vita uniche e ambienti in continua evoluzione.

    Le recenti scoperte paleontologiche hanno rivoluzionato la nostra comprensione di questi antichi abitanti della Terra. Contrariamente all'immagine tradizionale di rettili giganti dalla pelle squamosa, ora sappiamo che molti dinosauri erano coperti di piume e mostravano comportamenti sociali complessi. I fossili rinvenuti in Cina negli ultimi decenni hanno rivelato specie straordinarie che costituiscono l'anello mancante tra i dinosauri e gli uccelli moderni.

    La diversità dei dinosauri era straordinaria. Dal minuscolo Compsognathus, grande quanto un pollo, al maestoso Argentinosaurus, lungo fino a 40 metri, questi animali si adattarono a ogni nicchia ecologica disponibile. Alcuni erano predatori feroci come il Tyrannosaurus Rex, altri erano erbivori pacifici come il Diplodocus. Alcuni vivevano in branchi, altri erano solitari.

    Le nuove tecnologie stanno trasformando il campo della paleontologia. La tomografia computerizzata e la modellazione 3D permettono agli scienziati di studiare i fossili in modi prima impossibili. Queste tecniche hanno rivelato dettagli sorprendenti sulla struttura del cervello dei dinosauri, sui loro sensi e persino sui loro possibili comportamenti.

    La questione della loro estinzione rimane uno dei dibattiti più accesi nella comunità scientifica. Mentre la teoria dell'impatto meteoritico di Chicxulub è ampiamente accettata, nuove ricerche suggeriscono che i dinosauri stavano già affrontando sfide significative prima dell'impatto. Il vulcanismo intenso dei Trappi del Deccan in India stava già modificando il clima globale.

    Forse l'aspetto più affascinante è che i dinosauri non sono realmente estinti. Gli uccelli moderni sono i loro diretti discendenti, rappresentando un ramo evolutivo che è sopravvissuto alla grande estinzione. Questa connessione ci ricorda che la storia della vita sulla Terra è una narrazione continua di adattamento e sopravvivenza.

    Le implicazioni di queste scoperte vanno oltre la paleontologia. Lo studio dei dinosauri ci aiuta a comprendere i meccanismi dell'evoluzione, l'impatto dei cambiamenti climatici e la fragilità della vita sulla Terra. In un'epoca di rapidi cambiamenti ambientali, queste lezioni dal passato sono più rilevanti che mai.`,
  imageUrl: "https://picsum.photos/seed/dinos/400/200",
  url: "https://wikipedia.org/..."
};

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "La Storia di Roma Antica: Dall'Impero alla Repubblica",
    content: `La storia di Roma antica è una delle narrazioni più affascinanti della civiltà umana, che si estende per oltre mille anni. 
    Dalle umili origini come piccolo insediamento sulle rive del Tevere, Roma si trasformò nella più grande potenza del mondo antico.

    La fondazione di Roma, tradizionalmente datata al 753 a.C., è avvolta nel mito di Romolo e Remo. La città iniziò come monarchia, 
    attraversò il periodo repubblicano e raggiunse il suo apice durante l'impero. Ogni fase portò innovazioni significative nella politica, 
    nel diritto e nella società.

    L'espansione territoriale di Roma fu accompagnata da un'impressionante opera di ingegneria e urbanizzazione. Gli acquedotti, le strade 
    (come la Via Appia), i templi e gli anfiteatri testimoniano ancora oggi la grandezza della civiltà romana. Il Colosseo, in particolare, 
    rimane un simbolo indelebile della magnificenza architettonica romana.

    La società romana era estremamente strutturata, con distinzioni tra patrizi e plebei, cittadini e non cittadini, liberi e schiavi. 
    Il sistema giuridico romano, base del diritto moderno in molti paesi, rifletteva questa complessità sociale. Le innovazioni legali 
    romane, come il concetto di cittadinanza e i diritti di proprietà, influenzano ancora oggi il pensiero giuridico.

    L'esercito romano era una macchina militare senza precedenti. La legione romana, con la sua disciplina ferrea e le sue tattiche 
    innovative, permise a Roma di costruire e mantenere un impero che si estendeva dall'Atlantico all'Eufrate, dalla Britannia al Sahara.

    La cultura romana assimilò elementi da tutte le terre conquistate, specialmente dalla Grecia, creando una sintesi unica. La letteratura, 
    l'arte e la filosofia romana riflettono questa fusione culturale. Autori come Virgilio, Orazio e Ovidio crearono opere che sono 
    pietre miliari della letteratura mondiale.

    Il declino dell'Impero Romano d'Occidente nel V secolo d.C. non segnò la fine dell'influenza romana. L'eredità di Roma sopravvive 
    nella lingua, nel diritto, nell'architettura e in innumerevoli altri aspetti della civiltà occidentale moderna.`,
    imageUrl: "https://picsum.photos/seed/roma/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "2",
    title: "Leonardo da Vinci: Il Genio Universale del Rinascimento",
    content: `Leonardo da Vinci (1452-1519) incarna l'ideale rinascimentale dell'uomo universale, eccellendo come artista, scienziato, 
    inventore e pensatore. La sua curiosità insaziabile e la sua capacità di osservazione lo resero un pioniere in numerosi campi.

    Nato a Vinci, vicino Firenze, Leonardo iniziò la sua carriera come apprendista nella bottega del Verrocchio. Qui sviluppò non solo 
    le sue straordinarie capacità artistiche, ma anche l'abitudine di osservare attentamente il mondo naturale, una pratica che lo 
    avrebbe caratterizzato per tutta la vita.

    Le sue opere artistiche rivoluzionarono la pittura. La Gioconda, con il suo enigmatico sorriso, rappresenta un punto culminante 
    nella rappresentazione della psicologia umana attraverso l'arte. L'Ultima Cena introdusse nuove tecniche di prospettiva e composizione 
    che influenzarono generazioni di artisti.

    I suoi studi anatomici erano incredibilmente avanzati per l'epoca. Attraverso dissezioni dettagliate, Leonardo produsse alcuni dei 
    più accurati disegni anatomici mai visti fino ad allora. Le sue osservazioni sul corpo umano anticiparono scoperte che sarebbero 
    state confermate solo secoli dopo.

    Come ingegnere e inventore, Leonardo concepì macchine che sembravano provenire dal futuro. Dai suoi progetti per macchine volanti 
    ai disegni di carri armati e sottomarini, molte delle sue invenzioni anticiparono tecnologie che sarebbero state realizzate solo 
    secoli dopo.

    Il suo approccio alla scienza era unico per il suo tempo. Invece di basarsi sull'autorità dei testi antichi, Leonardo insisteva 
    sull'osservazione diretta e sulla sperimentazione. I suoi taccuini, scritti in una caratteristica scrittura speculare, contengono 
    migliaia di osservazioni e progetti.

    L'eredità di Leonardo continua a influenzare il mondo moderno. I suoi principi di osservazione, sperimentazione e integrazione tra 
    arte e scienza rimangono rilevanti per gli innovatori contemporanei.`,
    imageUrl: "https://picsum.photos/seed/leonardo/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "3",
    title: "La Rivoluzione Scientifica: Dal Medioevo all'Era Moderna",
    content: `La Rivoluzione Scientifica del XVI e XVII secolo rappresentò un punto di svolta fondamentale nella storia del pensiero umano. 
    Questo periodo straordinario vide l'emergere di un nuovo modo di comprendere il mondo naturale, basato sull'osservazione empirica e 
    sul metodo scientifico.

    Figure come Galileo Galilei rivoluzionarono non solo la nostra comprensione dell'universo, ma anche il modo stesso di fare scienza. 
    L'introduzione del telescopio nell'osservazione astronomica permise di sfidare il modello geocentrico dominante, portando a una 
    profonda revisione della nostra posizione nell'universo.

    Il contributo di Isaac Newton, con la sua teoria della gravitazione universale e le leggi del moto, fornì un quadro matematico 
    unificato per comprendere sia i movimenti celesti che i fenomeni terrestri. Questa sintesi rappresentò un trionfo dell'approccio 
    razionale e matematico allo studio della natura.

    La rivoluzione non si limitò all'astronomia e alla fisica. In biologia, l'invenzione del microscopio aprì un mondo completamente 
    nuovo, rivelando l'esistenza di microorganismi e la complessità della vita a livello cellulare. In chimica, gli alchimisti 
    medievali cedettero il posto a un approccio più sistematico e scientifico.

    L'impatto di questo periodo si estese ben oltre la scienza. Il nuovo modo di pensare influenzò profondamente la filosofia, la 
    religione e la società nel suo complesso. L'idea che il mondo naturale seguisse leggi comprensibili e matematicamente descrivibili 
    trasformò radicalmente la visione del mondo occidentale.`,
    imageUrl: "https://picsum.photos/seed/science/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "4",
    title: "L'Arte del Rinascimento Italiano",
    content: `Il Rinascimento italiano rappresenta uno dei periodi più straordinari nella storia dell'arte mondiale. Tra il XIV e il XVI 
    secolo, l'Italia divenne il centro di una rivoluzione artistica che avrebbe influenzato la cultura occidentale per secoli a venire.

    Questo periodo vide l'emergere di tecniche rivoluzionarie come la prospettiva lineare, che permise agli artisti di creare illusioni 
    di profondità più convincenti che mai. L'uso innovativo del chiaroscuro e dello sfumato da parte di artisti come Leonardo da Vinci 
    portò a nuovi livelli di realismo nella rappresentazione della forma umana.

    Gli artisti rinascimentali non si limitarono a una sola disciplina. Molti erano anche architetti, scultori, poeti e ingegneri. 
    Michelangelo Buonarroti, per esempio, eccelse in tutte queste arti, creando capolavori come la Cappella Sistina e il David.

    Il mecenatismo delle potenti famiglie italiane, come i Medici a Firenze, fornì il supporto finanziario necessario per questa 
    fioritura artistica. Questo patronato permise agli artisti di sperimentare nuove tecniche e affrontare progetti ambiziosi.`,
    imageUrl: "https://picsum.photos/seed/renaissance/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "5",
    title: "La Seconda Guerra Mondiale: Un Conflitto Globale",
    content: `La Seconda Guerra Mondiale (1939-1945) fu il conflitto più vasto e letale della storia umana. Coinvolse la maggior parte 
    delle nazioni del mondo e ridisegnò completamente gli equilibri geopolitici globali.

    Il conflitto vide l'emergere di nuove tecnologie militari e strategie di guerra. L'uso massiccio dell'aviazione, dei carri armati 
    e delle comunicazioni radio trasformò radicalmente il modo di condurre le operazioni militari.

    L'impatto sulla popolazione civile fu senza precedenti. Le città subirono bombardamenti devastanti, e l'Olocausto rappresentò uno 
    dei capitoli più oscuri della storia umana. Il lancio delle bombe atomiche su Hiroshima e Nagasaki segnò l'inizio dell'era nucleare.`,
    imageUrl: "https://picsum.photos/seed/ww2/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "6",
    title: "L'Evoluzione dei Computer: Dalla Matematica al Digitale",
    content: `La storia dei computer è un affascinante viaggio attraverso l'ingegno umano. Dalle prime macchine calcolatrici meccaniche 
    ai moderni supercomputer, questa evoluzione ha trasformato radicalmente il nostro mondo.

    I primi passi verso il computer moderno furono mossi da pionieri come Alan Turing e John von Neumann. Le loro teorie matematiche 
    e architetturali posero le basi per lo sviluppo dell'informatica moderna.

    L'avvento dei microprocessori negli anni '70 rivoluzionò il settore, rendendo possibile la creazione di computer personali. 
    L'introduzione del PC IBM e del Macintosh di Apple negli anni '80 portò i computer nelle case di milioni di persone.`,
    imageUrl: "https://picsum.photos/seed/computer/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "7",
    title: "Il Sistema Solare: Un Viaggio tra i Pianeti",
    content: `Il nostro sistema solare è un insieme straordinario di pianeti, lune, asteroidi e comete che orbitano attorno al Sole. 
    Ogni corpo celeste racconta una storia unica sulla formazione e l'evoluzione del nostro angolo di universo.

    I pianeti del sistema solare si dividono in due categorie principali: i pianeti rocciosi interni (Mercurio, Venere, Terra e Marte) 
    e i giganti gassosi esterni (Giove, Saturno, Urano e Nettuno).

    Le recenti missioni spaziali hanno rivelato dettagli sorprendenti sui nostri vicini cosmici. Le lune ghiacciate di Giove e Saturno 
    potrebbero nascondere oceani sotterranei potenzialmente abitabili.`,
    imageUrl: "https://picsum.photos/seed/space/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "8",
    title: "La Grande Muraglia Cinese: Meraviglia dell'Ingegneria Antica",
    content: `La Grande Muraglia Cinese è una delle più impressionanti opere di ingegneria mai realizzate dall'uomo. Estendendosi per 
    migliaia di chilometri, questa struttura monumentale testimonia l'incredibile capacità organizzativa dell'antica civiltà cinese.

    La costruzione della muraglia si estese per oltre due millenni, con diverse dinastie che contribuirono alla sua realizzazione. 
    Le tecniche costruttive si evolsero nel tempo, adattandosi ai materiali disponibili e alle sfide del terreno.`,
    imageUrl: "https://picsum.photos/seed/wall/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "9",
    title: "Il DNA: Il Codice della Vita",
    content: `La scoperta della struttura del DNA nel 1953 da parte di Watson e Crick rappresentò una delle più grandi rivoluzioni 
    nella storia della biologia. Questa molecola, organizzata in una doppia elica, contiene le istruzioni per la vita stessa.

    Il sequenziamento del genoma umano ha aperto nuove frontiere nella medicina e nella comprensione della nostra evoluzione. 
    Le moderne tecniche di editing genetico promettono di rivoluzionare il trattamento di molte malattie.`,
    imageUrl: "https://picsum.photos/seed/dna/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "10",
    title: "La Rivoluzione Industriale: L'Era delle Macchine",
    content: `La Rivoluzione Industriale, iniziata in Inghilterra nel XVIII secolo, trasformò radicalmente il modo in cui l'umanità 
    produceva beni e organizzava il lavoro. L'introduzione delle macchine a vapore e dei processi meccanizzati rivoluzionò l'industria.

    Questo periodo vide anche profondi cambiamenti sociali, con l'emergere di nuove classi sociali e la rapida urbanizzazione. 
    Le condizioni di lavoro nelle prime fabbriche portarono a importanti riforme sociali e al nascere dei movimenti sindacali.`,
    imageUrl: "https://picsum.photos/seed/industry/400/300",
    dateDownloaded: getRandomRecentDate()
  },
  {
    id: "11",
    title: "Le Piramidi di Giza: Misteri dell'Antico Egitto",
    content: `Le Piramidi di Giza rappresentano uno dei più grandi misteri dell'antichità. Costruite come tombe per i faraoni della 
    IV dinastia, queste strutture monumentali sfidano ancora oggi la nostra comprensione delle capacità ingegneristiche degli antichi egizi.

    La Grande Piramide di Cheope, in particolare, fu la struttura più alta del mondo per oltre 3.800 anni. Le tecniche di costruzione 
    utilizzate, la precisione dell'allineamento astronomico e la complessità della pianificazione testimoniano l'incredibile livello di 
    conoscenze matematiche e astronomiche raggiunte dall'antica civiltà egizia.`,
    imageUrl: "https://picsum.photos/seed/pyramids/400/300",
    dateDownloaded: getRandomRecentDate()
  }
];

// Ordina gli articoli per data di download (più recenti prima)
export const sortedMockArticles = mockArticles.sort(
  (a, b) => new Date(b.dateDownloaded).getTime() - new Date(a.dateDownloaded).getTime()
); 