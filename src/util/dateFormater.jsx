function dateFormater(dateString) {
    const currentDate = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
  
    if (diffInDays === 0) {
      return 'Hoje';
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays === 2) {
      return 'Anteontem';
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('pt-BR', options);
    }
  }
  
  export default dateFormater;