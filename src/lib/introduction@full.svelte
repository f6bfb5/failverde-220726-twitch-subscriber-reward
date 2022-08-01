<!-- 
  エクセルではてブを見るやーつ | なかけんツール集
  https://tools.nakaken88.com/excel-hatebu/
-->

<article>
  <h1>Big Title</h1>
  <section>
    <h2>Sub Title</h2>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, cumque
      sit! Sit atque eveniet veniam facilis ab soluta esse iusto fuga
      consequatur, dolor earum praesentium! Sapiente et reiciendis accusantium
      adipisci!
    </p>
    <h3>Little Title</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
      suscipit, at assumenda esse reiciendis tempora. Hic vitae excepturi velit,
      enim laboriosam nemo tempore culpa, in adipisci assumenda molestias,
      temporibus nostrum?
    </p>
  </section>
  <hr />
  <section>
    <h2>Sub Title</h2>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, cumque
      sit! Sit atque eveniet veniam facilis ab soluta esse iusto fuga
      consequatur, dolor earum praesentium! Sapiente et reiciendis accusantium
      adipisci!
    </p>
  </section>
  <hr />
  <section>
    <h2>Sub Title</h2>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, cumque
      sit! Sit atque eveniet veniam facilis ab soluta esse iusto fuga
      consequatur, dolor earum praesentium! Sapiente et reiciendis accusantium
      adipisci!
    </p>
    <details>
      <summary>This is a details element</summary>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium necessitatibus,
      voluptate vero quaerat quasi at maxime est commodi repellendus qui. Cumque
      consequatur magnam eum iste vero, itaque facere voluptates laudantium!
    </details>
  </section>
  <hr />
  <section>
    <h2>Sub Title</h2>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, cumque
      sit! Sit atque eveniet veniam facilis ab soluta esse iusto fuga
      consequatur, dolor earum praesentium! Sapiente et reiciendis accusantium
      adipisci!
    </p>
  </section>
</article>

<style scoped>
  h1 {
    margin: 0;
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
  }
  /* 3D box  */
  h2 {
    position: relative;
    border: 3px solid #03a9f4;
    color: #03a9f4;
    padding: 0.5rem;
    margin: 3rem 0.5rem 0 0;

    text-shadow: none;
  }
  h2::before,
  h2::after {
    position: absolute;
    margin: 0;
    border: solid #03a9f4;
    content: "";
    box-sizing: content-box;
  }
  h2::before {
    top: -10px;
    right: -16px;
    width: 10px;
    height: 100%;
    border-width: 2px 3px 4px 0px;
    transform: skewY(-45deg);
  }
  h2::after {
    top: -16px;
    left: 4px;
    width: 100%;
    height: 10px;
    border-width: 3px 2px 0px 4px;
    transform: skewX(-45deg);
  }

  h3 {
    margin-bottom: 0.5rem;
    padding-left: 10px;
    border-left: 3px solid #03a9f4;
  }

  hr {
    height: 4rem;
    margin: 0;
    border: none;
    background-color: #e8f5e9;
  }
  hr:after {
    content: "";
  }
  hr:nth-child(4n + 3) {
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  hr:nth-child(4n + 1) {
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }

  article {
    background-color: #e1f5fe;

    max-width: 960px;
    margin: auto;
  }

  section {
    padding: 1rem;
  }
  section:nth-child(4n + 2) {
    background-color: #e8f5e9;
  }
  section:nth-child(4n + 2) h2,
  section:nth-child(4n + 2) h2::after,
  section:nth-child(4n + 2) h2::before {
    border-color: #4caf50;
    color: #4caf50;
  }
  section:nth-child(4n + 2) h3 {
    border-color: #4caf50;
  }

  details {
    padding: 1rem;
    margin: 1.5rem 0;
    border: 4px solid #424242;
    border-radius: 12px;
  }
  details:last-child {
    margin-bottom: 0;
  }
  details summary {
    cursor: pointer;
    font-weight: bold;
  }
  details summary:focus {
    outline: none;
  }
</style>
