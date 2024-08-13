export async function getLimitProducts() {
    const apiUrl = `https://fakestoreapi.com/products?limit=5`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error('Falha na requisição ao Fake Store API. Detalhes:', data);
      }
    } catch (error) {
      throw new Error('Erro na requisição ao Fake Store API:', error);
    }
  }
  
 