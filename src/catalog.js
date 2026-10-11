const corePieces = [
  { id: 'solis-hoops', name: 'Solis Hoops', category: 'Earrings', gender: 'Women', price: 340, material: '18k yellow gold', badge: 'Featured', image: 'photo-1617038220319-276d3cfab638', second: 'photo-1535632066927-ab7c9ab60908', description: 'An illustrative, softly rounded hoop for everyday styling. This concept listing shows the kind of product detail a real jeweller should provide.' },
  { id: 'forma-signet', name: 'Forma Signet', category: 'Rings', gender: 'Women', price: 520, material: '18k yellow gold', badge: 'Featured', image: 'photo-1605100804763-247f67b3557e', second: 'photo-1603561596112-0a132b757442', description: 'A modern signet silhouette with a quietly confident profile. Metal fineness, dimensions, and availability are illustrative demo details.' },
  { id: 'luna-pendant', name: 'Luna Pendant', category: 'Necklaces', gender: 'Women', price: 460, material: '18k yellow gold · white sapphire', badge: '', image: 'photo-1599643478518-a784e5dc4c8f', second: 'photo-1611652022419-a9419f74343d', description: 'A luminous stone set against a simple pendant shape. This sample listing illustrates how a product page can disclose its materials.' },
  { id: 'tide-cuff', name: 'Tide Cuff', category: 'Bracelets', gender: 'Women', price: 610, material: '18k yellow gold', badge: '', image: 'photo-1611591437281-460bfbe1220a', second: 'photo-1611652022419-a9419f74343d', description: 'An open cuff with a fluid outline. Actual metal composition, dimensions, and fit should be confirmed with a retailer before purchase.' },
  { id: 'arc-studs', name: 'Arc Studs', category: 'Earrings', gender: 'Women', price: 285, material: '14k yellow gold', badge: '', image: 'photo-1611652022419-a9419f74343d', second: 'photo-1535632066927-ab7c9ab60908', description: 'A minimal curved stud shape designed to sit close to the ear. Product photography and specifications on this demo site are illustrative.' },
  { id: 'heirloom-chain', name: 'Heirloom Chain', category: 'Necklaces', gender: 'Women', price: 740, material: '18k yellow gold', badge: 'Featured', image: 'photo-1617038260897-41a1f14a8ca0', second: 'photo-1599643478518-a784e5dc4c8f', description: 'A tactile chain with a considered link profile. The name and composition are sample catalogue content, not verified product claims.' },
  { id: 'petal-ring', name: 'Petal Ring', category: 'Rings', gender: 'Women', price: 390, material: '14k yellow gold · white sapphire', badge: '', image: 'photo-1603561596112-0a132b757442', second: 'photo-1605100804763-247f67b3557e', description: 'A floral-inspired setting with a softly luminous centre. Confirm gemstone identity, any treatment, and metal fineness with the selling jeweller.' },
  { id: 'still-bangle', name: 'Still Bangle', category: 'Bracelets', gender: 'Women', price: 680, material: '18k yellow gold', badge: '', image: 'photo-1611652022419-a9419f74343d', second: 'photo-1611591437281-460bfbe1220a', description: 'A slim bangle silhouette designed to layer or wear alone. Final measurements and metal details should always be supplied by the seller.' },
]

const designNames = {
  Women: {
    Earrings: ['Aster', 'Celeste', 'Dahlia', 'Elara', 'Freya', 'Iris', 'Juniper', 'Lyra', 'Marigold', 'Neroli', 'Opaline', 'Solenne'],
    Necklaces: ['Amara', 'Bluebell', 'Clementine', 'Delphine', 'Estelle', 'Florence', 'Garden', 'Isolde', 'Louella', 'Mirelle', 'Noelle', 'Rosalie'],
    Rings: ['Arden', 'Bellamy', 'Clover', 'Darcy', 'Eloise', 'Fable', 'Giselle', 'Hollis', 'Indira', 'Juliet', 'Margot', 'Sylvie'],
    Bracelets: ['Anise', 'Briony', 'Camille', 'Dove', 'Emery', 'Fiora', 'Goldie', 'Harriet', 'Imogen', 'Linden', 'Marlow', 'Vivienne'],
  },
  Men: {
    Earrings: ['Ash', 'Bastien', 'Cedar', 'Dorian', 'Ellis', 'Fox', 'Gray', 'Hale', 'Indigo', 'Jules', 'Kit', 'Laurent'],
    Necklaces: ['Alton', 'Briar', 'Caspian', 'Drake', 'Everett', 'Flint', 'Gideon', 'Holden', 'Ivo', 'Kellan', 'Leif', 'Maddox'],
    Rings: ['Alden', 'Beckett', 'Colter', 'Dashiell', 'Emmett', 'Fletcher', 'Griffin', 'Harris', 'Irving', 'Knox', 'Langley', 'Merritt'],
    Bracelets: ['Archer', 'Bennett', 'Calloway', 'Deacon', 'Everest', 'Foster', 'Garrett', 'Hudson', 'Isaac', 'Keaton', 'Lennox', 'Montgomery'],
  },
}

export const productImages = {
  Earrings: ['photo-1617038220319-276d3cfab638', 'photo-1535632066927-ab7c9ab60908', 'photo-1611652022419-a9419f74343d', 'photo-1573408301185-9146fe634ad0', 'photo-1535632787350-4e68ef0ac584', 'photo-1515562141207-7a88fb7ce338', 'photo-1601821765780-754fa98637c5', 'photo-1583394838336-acd977736f90'],
  Necklaces: ['photo-1599643478518-a784e5dc4c8f', 'photo-1617038260897-41a1f14a8ca0', 'photo-1611652022419-a9419f74343d', 'photo-1535632787350-4e68ef0ac584', 'photo-1515562141207-7a88fb7ce338', 'photo-1601821765780-754fa98637c5', 'photo-1583394838336-acd977736f90', 'photo-1602173574767-37ac01994b2a'],
  Rings: ['photo-1605100804763-247f67b3557e', 'photo-1603561596112-0a132b757442', 'photo-1602173574767-37ac01994b2a', 'photo-1601821765780-754fa98637c5', 'photo-1573408301185-9146fe634ad0', 'photo-1535632787350-4e68ef0ac584', 'photo-1515562141207-7a88fb7ce338', 'photo-1583394838336-acd977736f90'],
  Bracelets: ['photo-1611591437281-460bfbe1220a', 'photo-1611652022419-a9419f74343d', 'photo-1599643478518-a784e5dc4c8f', 'photo-1583394838336-acd977736f90', 'photo-1535632787350-4e68ef0ac584', 'photo-1515562141207-7a88fb7ce338', 'photo-1601821765780-754fa98637c5', 'photo-1602173574767-37ac01994b2a'],
}

const generatedPieces = Object.entries(designNames).flatMap(([gender, categories]) =>
  Object.entries(categories).flatMap(([category, names]) =>
    names.map((name, index) => {
      const imageId = productImages[category][(index + (gender === 'Men' ? 2 : 0)) % productImages[category].length]
      const materials = ['14k yellow gold', 'sterling silver', '18k yellow gold', 'gold vermeil']
      const stone = index % 5 === 0 ? ' · white sapphire' : index % 7 === 0 ? ' · diamond' : ''
      const suffix = category === 'Earrings' ? (index % 2 ? 'Studs' : 'Hoops') : category === 'Rings' ? (index % 2 ? 'Band' : 'Signet') : category === 'Necklaces' ? (index % 2 ? 'Chain' : 'Pendant') : (index % 2 ? 'Cuff' : 'Bracelet')
      const material = `${materials[(index + (gender === 'Men' ? 1 : 0)) % materials.length]}${stone}`
      return {
        id: `${gender.toLowerCase()}-${category.toLowerCase()}-${name.toLowerCase()}`,
        name: `${name} ${suffix}`,
        category,
        gender,
        price: 180 + ((index * 73 + category.length * 17 + (gender === 'Men' ? 90 : 0)) % 760),
        material,
        badge: '',
        image: imageId,
        second: productImages[category][(index + 1) % productImages[category].length],
        description: `Illustrative ${material} ${category.toLowerCase()} in the AUREL concept collection. This demo entry is sample catalogue content; verify composition, dimensions, treatments, and availability directly with a retailer.`,
      }
    }),
  ),
)

export const pieces = [...corePieces, ...generatedPieces]
