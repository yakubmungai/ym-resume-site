export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      web: "Web",
      about: "About",
      resume: "Resume",
      hire: "Hire Me",
      swe: "Software Engineering",
      ba: "Business Analysis",
      eng_focus: "Engineering Focus",
      strat_focus: "Strategy Focus"
    },
    hero: {
      role: "Aspiring Software Engineer",
      intro: "I'm a Recent Grad CS major seeking full-time SWE roles, while actively freelancing high-performance web solutions focused on modern architectural standards and rapid delivery.",
      cta: "Get in touch"
    },
    web: {
      title: "Web Solutions",
      section: "SECTION 02",
      promo_h3: "Need a high-performance website?",
      promo_p: "I specialize in engineering high-performance websites and digital solutions under the moniker jacs.ai. Leveraging modern frameworks and optimized delivery pipelines, I build lightning-fast, premium experiences for select freelance clients.",
      cta: "Get Started",
      subtitle: "Take a look at my previous web projects below."
    },
    projects: {
      title: "Featured Work",
      section: "SECTION 01",
      visit: "Visit Site",
      live: "Live Project",
      view_all: "View all on GitHub"
    },
    about: {
      title: "About Me",
      section: "SECTION 03",
      location: "Location",
      graduation: "Graduation",
      university: "University",
      interests_h3: "Beyond the Code",
      interests_p: "When I'm not building software, I'm usually found exploring these passions.",
      bio_1: "I'm originally from Tanzania and came to the U.S. as a UWC Davis Scholar at the University of Florida. Navigating that transition on my own solidified a core belief I bring to my career: \"luck\" is simply the result of showing up every day with curiosity and grit. I don't wait for the right moment to appear; I prefer to build it through consistency and a relentless work ethic.",
      bio_2: "Outside of the professional grind, I'm a big sports fan. Whether I'm analyzing the strategy of a UFC card, watching the NBA, or competing in NBA2K, I'm drawn to the discipline it takes to win.",
      bio_3: "I'm also a self-proclaimed foodie with a very specific weakness—if there's a ribeye or lobster mac and cheese on the menu, I'm there. Ultimately, I carry that same appetite for excellence into every project I touch.",
      seeking: "Seeking full-time roles & freelance opportunities",
      cta: "Get in touch"
    },
    footer: {
      back_to_top: "Back to top",
      source_code: "Source Code"
    }
  },
  sw: {
    nav: {
      home: "Mwanzo",
      projects: "Miradi",
      web: "Tovuti",
      about: "Kuhusu",
      resume: "Wasifu",
      hire: "Tufanye Kazi",
      swe: "Uhandisi wa Programu",
      ba: "Uchambuzi wa Biashara",
      eng_focus: "Lengo la Uhandisi",
      strat_focus: "Lengo la Mkakati"
    },
    hero: {
      role: "Mhandisi wa Programu Anayechipukia",
      intro: "Mimi ni mhitimu wa hivi karibuni wa Sayansi ya Kompyuta ninayetafuta nafasi za kazi za kudumu, huku nikiendelea kutengeneza tovuti za kisasa na zenye kasi kwa wateja mbalimbali.",
      cta: "Wasiliana nami"
    },
    web: {
      title: "Suluhisho za Tovuti",
      section: "SEHEMU YA 02",
      promo_h3: "Unahitaji tovuti ya kisasa?",
      promo_p: "Ninabobea katika kutengeneza tovuti zenye kasi ya juu na suluhisho za kidijitali chini ya jina la msanidi jacs.ai. Nikitumia mifumo ya kisasa na njia za uwasilishaji zilizoboreshwa, ninajenga tovuti zenye kasi ya ajabu na mwonekano wa kuvutia kwa wateja maalum.",
      cta: "Tuanze Sasa",
      subtitle: "Angalia baadhi ya miradi yangu ya tovuti hapa chini."
    },
    projects: {
      title: "Kazi Zangu",
      section: "SEHEMU YA 01",
      visit: "Tembelea",
      live: "Ipo Hewani",
      view_all: "Ona zote kwenye GitHub"
    },
    about: {
      title: "Kuhusu Mimi",
      section: "SEHEMU YA 03",
      location: "Mahali",
      graduation: "Mahafali",
      university: "Chuo Kikuu",
      interests_h3: "Nje ya Kazi",
      interests_p: "Wakati sipo kwenye kompyuta, mara nyingi huwa najishughulisha na mambo haya yanayonipa hamasa.",
      bio_1: "Nimetokea Tanzania na nilikuja Marekani kama mwanafunzi wa ufadhili wa UWC Davis katika Chuo Kikuu cha Florida. Changamoto za kuishi ugenini peke yangu zilinifundisha jambo moja muhimu: mafanikio hayaji kwa bahati, bali kwa kujituma kila siku kwa bidii na shauku. Sisubiri nafasi itokee, bali naitengeneza mwenyewe kupitia msimamo na kazi ngumu.",
      bio_2: "Nje ya masuala ya kikazi, mimi ni mpenzi mkubwa wa michezo. Iwe ni kuchambua mbinu za UFC, kutazama NBA, au kucheza NBA2K, navutiwa sana na nidhamu inayohitajika ili kushinda.",
      bio_3: "Pia, napenda sana chakula kizuri—hasa kikiwa ni ribeye au lobster mac and cheese. Shauku hiyo hiyo ya ubora ndiyo ninayoitumia katika kila mradi ninaoufanya.",
      seeking: "Natafuta kazi za kudumu na mikataba ya kutengeneza tovuti",
      cta: "Wasiliana nami"
    },
    footer: {
      back_to_top: "Rudi Juu",
      source_code: "Pata namba za programu"
    }
  }
};

export type Language = 'en' | 'sw';
export type TranslationKeys = typeof translations.en;
