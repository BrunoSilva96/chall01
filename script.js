const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function normalizeTitle(title) {
  let clean = removeAccents(title.toLowerCase());

  // Substituições manuais
  clean = clean.replace(/semi[\s-]?desnatado/g, "semidesnatado");
  clean = clean.replace(/zero lactose|sem lactose/g, "zerolactose");
  clean = clean.replace(/\btipo\b/g, "");
  clean = clean.replace(/\bfatiado\b|\bfresco\b|\bcongelado\b/g, "");

  // Unidades e quantidades equivalentes
  clean = clean.replace(/1\s*(quilo|kg|quilos?|quilogramas?)/g, "1kg");
  clean = clean.replace(/1000g/g, "1kg");
  clean = clean.replace(/1\s*(litro|litros|l)/g, "1l");
  clean = clean.replace(/1000ml/g, "1l");
  clean = clean.replace(/500\s*gramas?/g, "500g");
  clean = clean.replace(/900\s*ml/g, "900ml");

  // Remove pontuação e símbolos
  clean = clean.replace(/[^\w\s]/g, "");

  // Divide, ordena e junta para gerar a “assinatura”
  const words = clean.trim().split(/\s+/).filter(Boolean);
  words.sort();

  return words.join(" ");
}

function categorizeProducts(products) {
  const categoryMap = new Map();

  for (const product of products) {
    const signature = normalizeTitle(product.title);

    if (!categoryMap.has(signature)) {
      categoryMap.set(signature, {
        category: product.title, // Primeiro título encontrado
        count: 0,
        products: [],
      });
    }

    const group = categoryMap.get(signature);
    group.count++;
    group.products.push({
      title: product.title,
      supermarket: product.supermarket,
      price: product.price,
    });
  }

  return Array.from(categoryMap.values());
}

// Exemplo de uso:

const products = require("./data01.json"); // Substitua com seu arquivo JSON completo
const result = categorizeProducts(products);

console.log(JSON.stringify(result, null, 2));