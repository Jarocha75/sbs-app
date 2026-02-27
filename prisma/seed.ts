import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../app/generated/prisma/client'
import { questions as q1 } from '../data/test-sukromna-bezpecnost-okruh-1'
import { questions as q2 } from '../data/test-sukromna-bezpecnost-okruh-2'
import { questions as q3 } from '../data/test-sukromna-bezpecnost-okruh-3'
import { questions as q4 } from '../data/test-sukromna-bezpecnost-okruh-4'
import { questions as qPriestupky } from '../data/test-priestupkove-pravo'
import { questions as qTrestne } from '../data/test-trestne-pravo'
import { questions as qUstava } from '../data/test-ustava-sr'
import { questions as qKriminalistika } from '../data/test-kriminalistika'
import { questions as qPolicajny } from '../data/test-policajny-zbor'
import { questions as qObecnaPolicia } from '../data/test-obecna-policia'
import { questions as qVojenskaPolicia } from '../data/test-vojenska-policia'
import { questions as qOchranaUdajov } from '../data/test-ochrana-osobnych-udajov'
import { questions as qSIS } from '../data/test-slovenska-informacna-sluzba'
import { questions as qPrakticke } from '../data/test-prakticke-otazky'
import { questions as qPOkruh1 } from '../data/test-p-okruh-1'
import { questions as qPOkruh2 } from '../data/test-p-okruh-2'
import { questions as qPOkruh3 } from '../data/test-p-okruh-3'
import { questions as qPOkruh4 } from '../data/test-p-okruh-4'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

type Answer = 'A' | 'B' | 'C'

type LocalQuestion = {
  id: number
  text: string
  options: { A: string; B: string; C: string }
  correct: Answer
}

function answerToIndex(a: Answer): number {
  return { A: 0, B: 1, C: 2 }[a]
}

function toQuestionsData(questions: LocalQuestion[]) {
  return questions.map(q => ({
    text: q.text,
    options: [q.options.A, q.options.B, q.options.C],
    correct: answerToIndex(q.correct),
  }))
}

function calcPassScore(passMark: number, total: number): number {
  return Math.round((passMark / total) * 100)
}

async function main() {
  console.log('Začínam seed...')

  // Vymazanie existujúcich dát (idempotentné spustenie)
  await prisma.question.deleteMany()
  await prisma.testResult.deleteMany()
  await prisma.progress.deleteMany()
  await prisma.test.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.course.deleteMany()
  console.log('Existujúce dáta vymazané')

  // Kurz Typ S
  const courseS = await prisma.course.create({
    data: {
      title: 'Preukaz SBS - Typ S',
      description: 'Príprava na skúšku odbornej spôsobilosti pre preukaz typu S',
      type: 'S',
      lessons: {
        create: [
          {
            order: 1,
            duration: 45,
            title: 'Zákon o súkromnej bezpečnosti – základné pojmy a povinnosti strážnika',
            videoUrl: null,
            outline: [
              'Čo upravuje zákon č. 473/2005 Z. z. o SBS',
              'Druhy činností súkromnej bezpečnosti',
              'Preukaz odbornej spôsobilosti – typy S a P',
              'Licencia bezpečnostnej služby',
              'Práva a povinnosti strážnika',
              'Zásada primeranosti a zákonnosti zásahu',
              'Rovnošata a preukaz strážnika',
              'Zodpovednosť strážnika pri výkone služby',
            ],
            content: `ÚVOD

Zákon č. 473/2005 Z. z. o poskytovaní služieb v oblasti súkromnej bezpečnosti (ďalej len „zákon o SBS") je základným právnym predpisom, ktorý upravuje výkon strážnej a detektívnej činnosti na území Slovenskej republiky. Každý strážnik musí tento zákon dôkladne poznať, pretože priamo určuje, čo smie a čo nesmie robiť pri výkone svojej práce.


1. DRUHY ČINNOSTÍ SÚKROMNEJ BEZPEČNOSTI

Podľa § 2 zákona o SBS sa súkromnou bezpečnosťou rozumejú tieto činnosti:

• Fyzická ochrana osôb a majetku – stráženie budov, objektov, priestorov a osôb.
• Pátracia činnosť – pátranie po osobách a veciach na základe zmluvy s klientom.
• Prevádzkovanie bezpečnostných systémov – správa technických bezpečnostných zariadení (kamery, alarmy, vstupné systémy).
• Vypracovanie bezpečnostných projektov – odborné posúdenie a návrh bezpečnostných opatrení.

Každá z týchto činností vyžaduje iný rozsah oprávnení a v niektorých prípadoch aj osobitný druh preukazu.


2. PREUKAZ ODBORNEJ SPÔSOBILOSTI

Bez platného preukazu odbornej spôsobilosti nesmie nikto vykonávať strážnu alebo detektívnu činnosť. Zákon rozlišuje dva základné typy:

Preukaz typu S (strážnik)
Oprávňuje na fyzickú ochranu osôb a majetku bez zbrane. Podmienky získania:
– vek najmenej 18 rokov,
– bezúhonnosť (čistý register trestov),
– zdravotná spôsobilosť (lekárske potvrdenie),
– úspešné absolvovanie odbornej skúšky na Krajskom riaditeľstve PZ.

Preukaz typu P (detektív / ozbrojená ochrana)
Oprávňuje na ochranu osôb a majetku so zbraňou a na pátraciu činnosť. Podmienky sú prísnejšie:
– zbrojný preukaz skupiny D alebo vyšší,
– absolvovanie rozšíreného školenia,
– prísnejší zdravotný a psychologický posudok.

Preukaz vydáva Krajské riaditeľstvo Policajného zboru SR. Platnosť preukazu je 5 rokov, po uplynutí doby je nutné požiadať o jeho obnovu a absolvovať opakovací test.


3. LICENCIA BEZPEČNOSTNEJ SLUŽBY

Bezpečnostná služba (firma) môže prevádzkovať svoju činnosť len na základe platnej licencie vydanej Ministerstvom vnútra SR (§ 11 zákona o SBS). Licencia sa udeľuje právnickej alebo fyzickej osobe, ktorá preukáže:

• bezúhonnosť zodpovednej osoby,
• odbornú spôsobilosť (preukaz SBS),
• materiálno-technické zabezpečenie (priestory, technika, výstroj),
• poistenie zodpovednosti za škodu.

Bez licencie je poskytovanie bezpečnostných služieb protizákonné a môže byť sankcionované pokutou až do výšky 33 000 EUR (§ 69 zákona o SBS).


4. PRÁVA STRÁŽNIKA PRI VÝKONE SLUŽBY

Strážnik má pri výkone strážnej služby tieto oprávnenia (§ 15 zákona o SBS):

• Zastaviť a vyzvať osobu na preukázanie totožnosti – ak je dôvodné podozrenie z porušenia chráneného záujmu (napr. krádež v stráženom objekte).
• Vykonať povrchovú prehliadku osoby alebo vozidla – len so súhlasom dotknutej osoby; bez súhlasu len vtedy, ak existuje priame ohrozenie života alebo majetku.
• Odopierať vstup alebo požadovať opustenie priestoru – v stráženom objekte na základe zmluvy s objednávateľom.
• Použiť donucovacie prostriedky (putá, hmaty, chvaty) – za prísne vymedzených podmienok primeranosti a nevyhnutnosti.

Dôležité obmedzenie: Strážnik nie je policajt. Nemá oprávnenie zadržať osobu dlhšie než je nevyhnutne nutné a je povinný okamžite privolať Policajný zbor SR.


5. ZÁSADA PRIMERANOSTI A ZÁKONNOSTI ZÁSAHU

Zásada primeranosti (§ 16 zákona o SBS) je jednou z najdôležitejších povinností strážnika. Znamená, že:

• Zásah musí byť nevyhnutný – strážnik použije donucovacie prostriedky len ak iný postup nestačí.
• Zásah musí byť primeraný hrozbe – intenzita zásahu nesmie prevýšiť mieru ohrozenia.
• Strážnik musí vopred vyzvať osobu na upustenie od protiprávneho konania – pokiaľ to situácia dovoľuje.

Príklad: Ak sa narušiteľ pokúša odísť po zadržaní pri krádeži, strážnik ho môže fyzicky zadržať; ak však nejde o priame ohrozenie, nesmie použiť úder alebo iný agresívny zásah.


6. ROVNOŠATA, PREUKAZ A IDENTIFIKÁCIA

Strážnik je pri výkone povinný (§ 17 zákona o SBS):

• Nosiť rovnošatu, ktorá ho viditeľne odlišuje od príslušníkov Policajného zboru. Rovnošata nesmie byť zameniteľná s uniformou štátnej polície.
• Mať viditeľne označené meno, priezvisko alebo identifikačné číslo.
• Na požiadanie sa preukázať preukazom odbornej spôsobilosti.

Vydávanie sa za policajta alebo nošenie uniforiem zameniteľných s políciou je trestným činom.


ZHRNUTIE – KĽÚČOVÉ BODY

✓ Zákon č. 473/2005 Z. z. je základným zákonom pre výkon SBS na Slovensku.
✓ Na výkon strážnej služby je povinný preukaz odbornej spôsobilosti (typ S alebo P).
✓ Bezpečnostná firma potrebuje licenciu MV SR – bez nej nemôže legálne pôsobiť.
✓ Strážnik môže zadržať osobu, vyzvať ju a použiť donucovacie prostriedky – vždy s dodržaním zásady primeranosti.
✓ Strážnik nie je policajt: nesmie sa za neho vydávať ani nosiť uniforemu podobnú polícii.`,
          },
          {
            order: 2,
            duration: 45,
            title: 'Základy trestného práva – skutkové podstaty pre výkon strážnej služby',
            videoUrl: null,
            outline: [
              'Štruktúra Trestného zákona č. 300/2005 Z. z.',
              'Trestné činy majetkové – krádež a lúpež',
              'Obmedzovanie osobnej slobody',
              'Trestná zodpovednosť strážnika',
              'Krajná núdza a nutná obrana',
            ],
            content: `Trestný zákon (zákon č. 300/2005 Z. z.) definuje trestné činy a tresty za ich spáchanie. Pre strážnika je nevyhnutné poznať najmä tie skutkové podstaty, s ktorými sa môže stretnúť pri výkone strážnej služby.

Krádež (§ 212 TZ) je jedným z najčastejšie sa vyskytujúcich trestných činov na strážených objektoch. Páchateľ si privlastní cudziu vec zmocnením sa jej. Hranica medzi priestupkom a trestným činom je pri hodnote škody – škoda malá (do 266 EUR) zakladá spravidla priestupok, vyššia hodnota trestný čin.

Lúpež (§ 188 TZ) je závažnejší trestný čin, pri ktorom páchateľ použije násilie alebo hrozbu bezprostredného násilia s úmyslom zmocniť sa cudzej veci. Strážnik je povinný v takejto situácii bezodkladne privolať Policajný zbor.

Obmedzovanie osobnej slobody (§ 183 TZ) je dôležité z hľadiska práva strážnika zadržať osobu. Strážnik môže osobu zastaviť a vyzvať na preukázanie totožnosti len v rozsahu oprávnení daných zákonom o SBS; akékoľvek prekročenie týchto oprávnení môže byť samo o sebe trestným činom.

Trestná zodpovednosť strážnika vzniká, ak jeho konanie napĺňa znaky skutkovej podstaty trestného činu – t. j. je protiprávne, zavinené a dosahuje stupeň spoločenskej nebezpečnosti. Strážnik sa môže zbaviť trestnej zodpovednosti krajnou núdzou (§ 24 TZ) alebo nutnou obranou (§ 25 TZ) za zákonných podmienok.`,
          },
          {
            order: 3,
            duration: 45,
            title: 'Ochrana osobných údajov – povinnosti bezpečnostnej služby podľa GDPR a zákona č. 18/2018 Z. z.',
            videoUrl: null,
            outline: [
              'GDPR a zákon č. 18/2018 Z. z. – prehľad',
              'Čo je osobný údaj',
              'Kamerové systémy a oprávnený záujem',
              'Doby uchovávania záznamov',
              'Poskytovanie údajov tretím osobám',
              'Sankcie za porušenie',
            ],
            content: `Nariadenie Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákon č. 18/2018 Z. z. o ochrane osobných údajov tvoria právny rámec, ktorý musí bezpečnostná služba dôsledne rešpektovať pri spracúvaní osobných údajov chránených osôb, zamestnancov a návštevníkov.

Osobným údajom je akákoľvek informácia vzťahujúca sa k identifikovanej alebo identifikovateľnej fyzickej osobe – meno, adresa, číslo preukazu totožnosti, záznamy z kamerového systému, záznamy v knihe návštev a pod.

Bezpečnostná služba ako prevádzkovateľ je povinná spracúvať osobné údaje len na zákonnom právnom základe. Pri monitorovaní priestorov kamerovým systémom je právnym základom spravidla oprávnený záujem prevádzkovateľa (čl. 6 ods. 1 písm. f) GDPR). Dotknuté osoby musia byť o kamerovom systéme informované viditeľnou tabuľkou ešte pred vstupom do monitorovaného priestoru.

Záznamy z kamerového systému smú byť uchovávané len po dobu nevyhnutnú na účel ich spracúvania – vo väčšine prípadov 7 až 15 dní. Dlhšia doba uchovávania musí byť odôvodnená a zdokumentovaná.

Strážnik nesmie poskytnúť osobné údaje tretím osobám bez zákonného oprávnenia. Výnimkou je prípad, keď si osobné údaje vyžiada Policajný zbor v rámci trestného alebo priestupkového konania. V takomto prípade sa odporúča požiadať o písomné potvrdenie.

Porušenie povinností ochrany osobných údajov môže viesť k pokute zo strany Úradu na ochranu osobných údajov SR až do výšky 20 000 000 EUR alebo 4 % celkového ročného obratu.`,
          },
        ],
      },
      tests: {
        create: [
          {
            title: 'Súkromná bezpečnosť - Okruh 1',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q1) },
          },
          {
            title: 'Súkromná bezpečnosť - Okruh 2',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q2) },
          },
          {
            title: 'Súkromná bezpečnosť - Okruh 3',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q3) },
          },
          {
            title: 'Súkromná bezpečnosť - Okruh 4',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q4) },
          },
          {
            title: 'Priestupkové právo',
            passScore: calcPassScore(8, 10), // 80%
            questions: { create: toQuestionsData(qPriestupky) },
          },
          {
            title: 'Trestné právo',
            passScore: calcPassScore(22, 27), // 82%
            questions: { create: toQuestionsData(qTrestne) },
          },
          {
            title: 'Ústava SR a ZĽPS',
            passScore: calcPassScore(10, 12), // 83%
            questions: { create: toQuestionsData(qUstava) },
          },
          {
            title: 'Kriminalistika',
            passScore: calcPassScore(10, 13), // 77%
            questions: { create: toQuestionsData(qKriminalistika) },
          },
          {
            title: 'Policajný zbor',
            passScore: calcPassScore(12, 15), // 80%
            questions: { create: toQuestionsData(qPolicajny) },
          },
          {
            title: 'Obecná polícia',
            passScore: calcPassScore(7, 9), // 78%
            questions: { create: toQuestionsData(qObecnaPolicia) },
          },
          {
            title: 'Vojenská polícia',
            passScore: calcPassScore(4, 5), // 80%
            questions: { create: toQuestionsData(qVojenskaPolicia) },
          },
          {
            title: 'Ochrana osobných údajov',
            passScore: calcPassScore(6, 7), // 86%
            questions: { create: toQuestionsData(qOchranaUdajov) },
          },
          {
            title: 'Slovenská informačná služba',
            passScore: calcPassScore(2, 2), // 100%
            questions: { create: toQuestionsData(qSIS) },
          },
          {
            title: 'Praktické otázky SBS',
            passScore: calcPassScore(8, 10), // 80%
            questions: { create: toQuestionsData(qPrakticke) },
          },
        ],
      },
    },
  })

  console.log(`Kurz vytvorený: ${courseS.title}`)

  // Kurz Typ P
  const courseP = await prisma.course.create({
    data: {
      title: 'Preukaz SBS - Typ P',
      description: 'Príprava na skúšku odbornej spôsobilosti pre preukaz typu P',
      type: 'P',
      tests: {
        create: [
          {
            title: 'P - Okruh 1',
            passScore: calcPassScore(36, 40), // 90%
            questions: { create: toQuestionsData(qPOkruh1) },
          },
          {
            title: 'P - Okruh 2',
            passScore: calcPassScore(36, 40), // 90%
            questions: { create: toQuestionsData(qPOkruh2) },
          },
          {
            title: 'P - Okruh 3',
            passScore: calcPassScore(36, 40), // 90%
            questions: { create: toQuestionsData(qPOkruh3) },
          },
          {
            title: 'P - Okruh 4',
            passScore: calcPassScore(36, 40), // 90%
            questions: { create: toQuestionsData(qPOkruh4) },
          },
        ],
      },
    },
  })

  console.log(`Kurz vytvorený: ${courseP.title}`)
  console.log('Seed úspešne dokončený!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
