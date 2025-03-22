const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function normalizeTitle(title) {
  const unitsMap = {
    "quilo": "kg",
    "quilos": "kg",
    "litro": "l",
    "litros": "l"
  };

  const substitutions = {
    "semi desnatado": "semidesnatado",
    "semi-desnatado": "semidesnatado",
    "tipo": ""
  };

  let clean = removeAccents(title.toLowerCase());

  clean = clean.replace(/\b1\s+(quilo|quilos|kg)\b/g, "1kg");
  clean = clean.replace(/\b1\s+(litro|litros|l)\b/g, "1l");
  clean = clean.replace(/\b2\s+(litro|litros|l)\b/g, "2l");

  for (const [from, to] of Object.entries(substitutions)) {
    clean = clean.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  }

  for (const [from, to] of Object.entries(unitsMap)) {
    clean = clean.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  }

  clean = clean.replace(/[^a-z0-9\s]/g, "");

  const words = clean.trim().split(/\s+/).sort();
  return words.join(" ");
}


function categorizeProducts(products) {
  const categories = new Map();

  for (const product of products) {
    const signature = normalizeTitle(product.title);

    if (!categories.has(signature)) {
      categories.set(signature, {
        category: product.title,
        count: 0,
        products: []
      });
    }

    const group = categories.get(signature);
    group.count++;
    group.products.push({
      title: product.title,
      supermarket: product.supermarket
    });
  }

  return Array.from(categories.values());
}


const stockList = [
  {
    "id": 1,
    "title": "Leite Integral Piracanjuba 1L",
    "supermarket": "Supermercado A",
  },
  {
    "id": 2,
    "title": "Leite Piracanjuba Integral 1L",
    "supermarket": "Supermercado B",
  },
  {
    "id": 3,
    "title": "Leite Integral Italac 1L",
    "supermarket": "Supermercado A",
  },
  {
    "id": 4,
    "title": "Leite Italac Integral 1L",
    "supermarket": "Supermercado C",
  },
  {
    "id": 5,
    "title": "Leite Parmalat Integral 1L",
    "supermarket": "Supermercado D",
  },
  {
    "id": 6,
    "title": "Leite Desnatado Piracanjuba 1L",
    "supermarket": "Supermercado A",
  },
  {
    "id": 7,
    "title": "Piracanjuba Leite Desnatado 1L",
    "supermarket": "Supermercado B",
  },
  {
    "id": 8,
    "title": "Leite Semi-Desnatado Piracanjuba 1L",
    "supermarket": "Supermercado A",
  },
  {
    "id": 9,
    "title": "Leite Piracanjuba Semi Desnatado 1 Litro",
    "supermarket": "Supermercado C",
  },
  {
    "id": 10,
    "title": "Arroz Branco Tio João 5kg",
    "supermarket": "Supermercado A",
  },
  {
    "id": 11,
    "title": "Arroz Tio João Branco 5kg",
    "supermarket": "Supermercado B",
  },
  {
    "id": 12,
    "title": "Arroz Tio João Integral 5kg",
    "supermarket": "Supermercado A",
  },
  {
    "id": 13,
    "title": "Feijão Carioca Camil 1kg",
    "supermarket": "Supermercado A",
  },
  {
    "id": 14,
    "title": "Feijão Camil Tipo Carioca 1kg",
    "supermarket": "Supermercado C",
  },
  {
    "id": 15,
    "title": "Feijao Carioca Camil 1 Quilo",
    "supermarket": "Supermercado D",
  }
]

console.log(categorizeProducts(stockList))