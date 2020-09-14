<script lang="ts">
  let scoops = 1;
  let flavors = ['Stuff'];
  const scoopNum = ['One', 'Two', 'Three'];
  const menu = ['Cookies and cream', 'Mint choc chip', 'Raspbery ripple'];
  $: {
    const temp = [];
    for (let i = 0; i < scoops; i += 1) {
      [temp[i]] = menu;
    }
    flavors = temp;
  }

  // function join(flavours) {
  //   if (flavours.length === 1) return flavours[0];
  //   return `${flavours.slice(0, -1).join(', ')} and ${
  //     flavours[flavours.length - 1]
  //   }`;
  // }
</script>

<h2>Size</h2>
{#each Array(3) as _, i}
  <label>
    <input type="radio" bind:group={scoops} value={i + 1} />
    {scoopNum[i]}
    {i === 0 ? 'scoop' : 'scoops'}
  </label>
{/each}

<h2>Flavours</h2>

{#each Array(scoops) as _, i}
  {#if scoops !== 1}
    <h3>Scoop {i + 1}</h3>
  {/if}
  {#each menu as item}
    <label>
      <input type="radio" bind:group={flavors[i]} value={item} />
      {item}
    </label>
  {/each}
{/each}

<p>
  You ordered {scoops}
	{scoops === 1 ? 'scoop' : 'scoops'} of {#each flavors as flavor, i}
    {i !== flavors.length - 1 ? `${flavor}, ` : `and ${flavor}.`}
  {/each}
</p>
