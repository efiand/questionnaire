export default {

  // Применение класса к набору DOM-элементов
  applyClass(selector: string, Class: any) {
    const nodeList = document.querySelectorAll(selector);

    for (let i = 0; i < nodeList.length; i++) {
      new Class(nodeList[i]);
    }
  }
};
