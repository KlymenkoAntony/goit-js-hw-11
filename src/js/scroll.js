export function scroll() {
    const listElm = document.querySelector('.gallery');
    listElm.addEventListener('scroll', e => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore();
      }
    });
}