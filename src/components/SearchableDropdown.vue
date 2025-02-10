<script setup lang="ts">
import { computed, ref } from 'vue'
import Fuse from 'fuse.js'

const teachers = [
  {
    key: 'vida-vidmar',
    short: 'V. Vidmar',
    fullName: 'Vida Vidmar',
    initials: 'V. V.'
  },
  {
    key: 'katja-lasbaher',
    short: 'K. Lasbaher',
    fullName: 'Katja Lasbaher',
    initials: 'K. L.'
  },
  {
    key: 'spela-pretnar',
    short: 'Š. Pretnar',
    fullName: 'Špela Pretnar',
    initials: 'Š. P.'
  },
  {
    key: 'nika-zidan',
    short: 'N. Židan',
    fullName: 'Nika Židan',
    initials: 'N. Ž.'
  },
  {
    key: 'aleksandra-saska-kucan',
    short: 'A. Kučan',
    fullName: 'Aleksandra Saška Kučan',
    initials: 'A. S. K.'
  },
  {
    key: 'slavica-skerbot',
    short: 'S. Škerbot',
    fullName: 'Slavica Škerbot',
    initials: 'S. Š.'
  },
  {
    key: 'aleks-prasnikar',
    short: 'A. Prašnikar',
    fullName: 'Aleks Prašnikar',
    initials: 'A. P.'
  },
  {
    key: 'andraz-zugelj',
    short: 'A. Žugelj',
    fullName: 'Andraž Žugelj',
    initials: 'A. Ž.'
  },
  {
    key: 'david-fekonja',
    short: 'D. Fekonja',
    fullName: 'David Fekonja',
    initials: 'D. F.'
  },
  {
    key: 'jernej-pustoslemsek',
    short: 'J. Pustoslemšek',
    fullName: 'Jernej Pustoslemšek',
    initials: 'J. P.'
  },
  {
    key: 'alenka-zorko',
    short: 'A. Zorko',
    fullName: 'Alenka Zorko',
    initials: 'A. Z.'
  },
  {
    key: 'janez-trcek',
    short: 'J. Trček',
    fullName: 'Janez Trček',
    initials: 'J. T.'
  },
  {
    key: 'ana-vukelic',
    short: 'A. Vukelić',
    fullName: 'Ana Vukelić',
    initials: 'A. V.'
  },
  {
    key: 'ales-volcini',
    short: 'A. Volčini',
    fullName: 'Aleš Volčini',
    initials: 'A. V.'
  },
  {
    key: 'milan-topolovec',
    short: 'M. Topolovec',
    fullName: 'Milan Topolovec',
    initials: 'M. T.'
  },
  {
    key: 'david-zindovic',
    short: 'D. Zindović',
    fullName: 'David Zindović',
    initials: 'D. Z.'
  },
  {
    key: 'aleks-turk',
    short: 'A. Turk',
    fullName: 'Aleks Turk',
    initials: 'A. T.'
  },
  {
    key: 'ana-rebec',
    short: 'A. Rebec',
    fullName: 'Ana Rebec',
    initials: 'A. R.'
  },
  {
    key: 'romana-sivic',
    short: 'R. Šivic',
    fullName: 'Romana Šivic',
    initials: 'R. Š.'
  },
  {
    key: 'igor-petrovcic',
    short: 'I. Petrovčič',
    fullName: 'Igor Petrovčič',
    initials: 'I. P.'
  },
  {
    key: 'anton-orehek',
    short: 'A. Orehek',
    fullName: 'Anton Orehek',
    initials: 'A. O.'
  },
  {
    key: 'igor-vulic',
    short: 'I. Vulić',
    fullName: 'Igor Vulić',
    initials: 'I. V.'
  },
  {
    key: 'amanda-zupanc',
    short: 'A. Zupanc',
    fullName: 'Amanda Zupanc',
    initials: 'A. Z.'
  },
  {
    key: 'zlatko-vucenovic',
    short: 'Z. Vučenović',
    fullName: 'Zlatko Vučenović',
    initials: 'Z. V.'
  },
  {
    key: 'tomo-omahna',
    short: 'T. Omahna',
    fullName: 'Tomo Omahna',
    initials: 'T. O.'
  },
  {
    key: 'damijan-purg',
    short: 'D. Purg',
    fullName: 'Damijan Purg',
    initials: 'D. P.'
  },
  {
    key: 'sonja-krapez',
    short: 'S. Krapež',
    fullName: 'Sonja Krapež',
    initials: 'S. K.'
  },
  {
    key: 'marija-kolenc',
    short: 'M. Kolenc',
    fullName: 'Marija Kolenc',
    initials: 'M. K.'
  },
  {
    key: 'marjeta-sustersic-menart',
    short: 'M. Šušteršič Menart',
    fullName: 'Marjeta Šušteršič Menart',
    initials: 'M. Š. M.'
  },
  {
    key: 'merlin-gulan-lokar',
    short: 'M. Gulan Lokar',
    fullName: 'Merlin Gulan Lokar',
    initials: 'M. G. L.'
  },
  {
    key: 'dusan-razpotnik',
    short: 'D. Razpotnik',
    fullName: 'Dušan Razpotnik',
    initials: 'D. R.'
  },
  {
    key: 'katarina-kogej',
    short: 'K. Kogej',
    fullName: 'Katarina Kogej',
    initials: 'K. K.'
  },
  {
    key: 'maja-azarov-domajnko',
    short: 'M. Azarov Domajnko',
    fullName: 'Maja Azarov Domajnko',
    initials: 'M. A. D.'
  },
  {
    key: 'rok-erman',
    short: 'R. Erman',
    fullName: 'Rok Erman',
    initials: 'R. E.'
  },
  {
    key: 'manuela-markoja-subara',
    short: 'M. Markoja Šubara',
    fullName: 'Manuela Markoja Šubara',
    initials: 'M. M. Š.'
  },
  {
    key: 'franc-kamenik',
    short: 'F. Kamenik',
    fullName: 'Franc Kamenik',
    initials: 'F. K.'
  },
  {
    key: 'mirjana-visnikar-ivic',
    short: 'M. Višnikar Ivić',
    fullName: 'Mirjana Višnikar Ivić',
    initials: 'M. V. I.'
  },
  {
    key: 'erika-plesa',
    short: 'E. Pleša',
    fullName: 'Erika Pleša',
    initials: 'E. P.'
  },
  {
    key: 'hana-brezovnik',
    short: 'H. Brezovnik',
    fullName: 'Hana Brezovnik',
    initials: 'H. B.'
  },
  {
    key: 'urska-rozman',
    short: 'U. Rozman',
    fullName: 'Urška Rozman',
    initials: 'U. R.'
  },
  {
    key: 'jozef-leskovec',
    short: 'J. Leskovec',
    fullName: 'Jožef Leskovec',
    initials: 'J. L.'
  },
  {
    key: 'darjan-toth',
    short: 'D. Toth',
    fullName: 'Darjan Toth',
    initials: 'D. T.'
  },
  {
    key: 'matic-urbanija',
    short: 'M. Urbanija',
    fullName: 'Matic Urbanija',
    initials: 'M. U.'
  },
  {
    key: 'marko-tomsic',
    short: 'M. Tomšič',
    fullName: 'Marko Tomšič',
    initials: 'M. T.'
  },
  {
    key: 'alenka-hari',
    short: 'A. Hari',
    fullName: 'Alenka Hari',
    initials: 'A. H.'
  },
  {
    key: 'maks-seme',
    short: 'M. Seme',
    fullName: 'Maks Seme',
    initials: 'M. S.'
  },
  {
    key: 'melita-kompolsek',
    short: 'M. Kompolšek',
    fullName: 'Melita Kompolšek',
    initials: 'M. K.'
  },
  {
    key: 'lucka-kovac-martincic',
    short: 'L. Kovač Martinčič',
    fullName: 'Lučka Kovač Martinčič',
    initials: 'L. K. M.'
  },
  {
    key: 'alexander-pene',
    short: 'A. Pene',
    fullName: 'Alexander Pene',
    initials: 'A. P.'
  },
  {
    key: 'mitja-vodeb',
    short: 'M. Vodeb',
    fullName: 'Mitja Vodeb',
    initials: 'M. V.'
  },
  {
    key: 'dusan-sitar',
    short: 'D. Sitar',
    fullName: 'Dušan Sitar',
    initials: 'D. S.'
  },
  {
    key: 'mojca-fink',
    short: 'M. Fink',
    fullName: 'Mojca Fink',
    initials: 'M. F.'
  },
  {
    key: 'maja-granda',
    short: 'M. Granda',
    fullName: 'Maja Granda',
    initials: 'M. G.'
  },
  {
    key: 'joze-versnjak',
    short: 'J. Veršnjak',
    fullName: 'Jože Veršnjak',
    initials: 'J. V.'
  },
  {
    key: 'jernej-golobic',
    short: 'J. Golobič',
    fullName: 'Jernej Golobič',
    initials: 'J. G.'
  },
  {
    key: 'igor-cugalj',
    short: 'I. Čugalj',
    fullName: 'Igor Čugalj',
    initials: 'I. Č.'
  },
  {
    key: 'neja-benedetic',
    short: 'N. Benedetič',
    fullName: 'Neja Benedetič',
    initials: 'N. B.'
  },
  {
    key: 'karmen-brina-kodric-rasl',
    short: 'K. Kodrič Rašl',
    fullName: 'Karmen Brina Kodrič Rašl',
    initials: 'K. B. K. R.'
  },
  {
    key: 'janez-omahen',
    short: 'J. Omahen',
    fullName: 'Janez Omahen',
    initials: 'J. O.'
  },
  {
    key: 'sonja-zver',
    short: 'S. Zver',
    fullName: 'Sonja Zver',
    initials: 'S. Z.'
  },
  {
    key: 'kristina-cvetkovic',
    short: 'K. Cvetković',
    fullName: 'Kristina Cvetković',
    initials: 'K. C.'
  },
  {
    key: 'mojca-jerovsek-toth',
    short: 'M. Jerovšek Toth',
    fullName: 'Mojca Jerovšek Toth',
    initials: 'M. J. T.'
  },
  {
    key: 'lidija-vintar',
    short: 'L. Vintar',
    fullName: 'Lidija Vintar',
    initials: 'L. V.'
  },
  {
    key: 'maja-pezdir',
    short: 'M. Pezdir',
    fullName: 'Maja Pezdir',
    initials: 'M. P.'
  },
  {
    key: 'rastislav-snoj',
    short: 'R. Snoj',
    fullName: 'Rastislav Snoj',
    initials: 'R. S.'
  },
  {
    key: 'tjasa-hrovatic',
    short: 'T. Hrovatič',
    fullName: 'Tjaša Hrovatič',
    initials: 'T. H.'
  },
  {
    key: 'ziga-kralj',
    short: 'Ž. Kralj',
    fullName: 'Žiga Kralj',
    initials: 'Ž. K.'
  },
  {
    key: 'matic-podpadec',
    short: 'M. Podpadec',
    fullName: 'Matic Podpadec',
    initials: 'M. P.'
  },
  {
    key: 'alexander-jerkovic',
    short: 'A. Jerković',
    fullName: 'Alexander Jerković',
    initials: 'A. J.'
  },
  {
    key: 'beti-kerin',
    short: 'B. Kerin',
    fullName: 'Beti Kerin',
    initials: 'B. K.'
  },
  {
    key: 'katja-kopasz',
    short: 'K. Kopasz',
    fullName: 'Katja Kopasz',
    initials: 'K. K.'
  },
  {
    key: 'milan-setnicar',
    short: 'M. Setničar',
    fullName: 'Milan Setničar',
    initials: 'M. S.'
  },
  {
    key: 'janez-miklavc',
    short: 'J. Miklavc',
    fullName: 'Janez Miklavc',
    initials: 'J. M.'
  },
  {
    key: 'tomaz-medica',
    short: 'T. Medica',
    fullName: 'Tomaž Medica',
    initials: 'T. M.'
  },
  {
    key: 'andreja-vehovec',
    short: 'A. Vehovec',
    fullName: 'Andreja Vehovec',
    initials: 'A. V.'
  },
  {
    key: 'marko-kastelic',
    short: 'M. Kastelic',
    fullName: 'Marko Kastelic',
    initials: 'M. K.'
  },
  {
    key: 'matjaz-majnik',
    short: 'M. Majnik',
    fullName: 'Matjaž Majnik',
    initials: 'M. M.'
  },
  {
    key: 'mihael-kriselj',
    short: 'M. Krišelj',
    fullName: 'Mihael Krišelj',
    initials: 'M. K.'
  },
  {
    key: 'vid-marolt',
    short: 'V. Marolt',
    fullName: 'Vid Marolt',
    initials: 'V. M.'
  },
  {
    key: 'natasa-makarovic',
    short: 'N. Makarovič',
    fullName: 'Nataša Makarovič',
    initials: 'N. M.'
  },
  {
    key: 'katarina-kotnik-ivacic',
    short: 'K. Kotnik Ivačič',
    fullName: 'Katarina Kotnik Ivačič',
    initials: 'K. K. I.'
  },
  {
    key: 'aleksandar-lazarevic',
    short: 'A. Lazarević',
    fullName: 'Aleksandar Lazarević',
    initials: 'A. L.'
  },
  {
    key: 'jan-trstenjak',
    short: 'J. Trstenjak',
    fullName: 'Jan Trstenjak',
    initials: 'J. T.'
  },
  {
    key: 'matej-stipetic',
    short: 'M. Stipetić',
    fullName: 'Matej Stipetić',
    initials: 'M. S.'
  },
  {
    key: 'tea-loncaric',
    short: 'T. Lončarič',
    fullName: 'Tea Lončarič',
    initials: 'T. L.'
  },
  {
    key: 'pavel-music',
    short: 'P. Mušič',
    fullName: 'Pavel Mušič',
    initials: 'P. M.'
  },
  {
    key: 'katja-lavka',
    short: 'K. Lavka',
    fullName: 'Katja Lavka',
    initials: 'K. L.'
  },
  {
    key: 'david-kopasz',
    short: 'D. Kopasz',
    fullName: 'David Kopasz',
    initials: 'D. K.'
  },
  {
    key: 'anaja-urek',
    short: 'A. Urek',
    fullName: 'Anaja Urek',
    initials: 'A. U.'
  },
  {
    key: 'nicholas-byrne',
    short: 'N. Byrne',
    fullName: 'Nicholas Byrne',
    initials: 'N. B.'
  },
  {
    key: 'andrej-gustin',
    short: 'A. Guštin',
    fullName: 'Andrej Guštin',
    initials: 'A. G.'
  },
  {
    key: 'nejc-bertoncelj',
    short: 'N. Bertoncelj',
    fullName: 'Nejc Bertoncelj',
    initials: 'N. B.'
  },
  {
    key: 'lea-koler',
    short: 'L. Koler',
    fullName: 'Lea Koler',
    initials: 'L. K.'
  }
]

const f = new Fuse(teachers, {
  ignoreDiacritics: true,
  shouldSort: true,
  keys: ['fullName']
})

const open = ref(false)

const surnameThing = (x: string) => x.split(' ').toReversed().join(' ')

const items = teachers
  .map((x) => x.fullName)
  .sort((a, b) => surnameThing(a).localeCompare(surnameThing(b)))

const displayItems = computed(() => {
  if (searchString.value.trim().length == 0) return items
  return f.search(searchString.value).map((x) => x.item.fullName)
})

const searchString = ref('')

const emit = defineEmits<{
  selected: [key: string]
}>()
</script>

<template>
  <div class="dropdown">
    <div class="dropdown-main" @click="() => (open = !open)">
      <input type="search" placeholder="Thing" v-model="searchString" />
      <button class="dropdown-button">{{ open ? '^' : 'V' }}</button>
    </div>

    <dialog class="dropdown-list-wrapper" :open="open">
      <ul class="dropdown-list">
        <li
          class="dropdown-list-item"
          v-for="item in displayItems"
          :key="item"
          @click="$emit('selected', item)"
        >
          {{ item }}
        </li>
      </ul>
    </dialog>
  </div>
</template>

<style lang="less">
@reference "../assets/main.less";

.dropdown {
  position: relative;
}

.dropdown-list-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 100px;
  width: 100%;

  overflow-y: scroll;
  background-color: white;
}
</style>
