<script lang="ts">

  import type { PageData } from './$types'
  export let data: PageData

  export let next: string = undefined
</script>

{#if data.me}
<main class="flex flex--tight_gapped">
  <a href={next || "/compte"} class="button button--black">Continuer en tant que {data.me.givenName} {data.me.familyName}</a>
</main>
{:else}
<main class="flex flex--tight_gapped">
  <form class="col col--6of12" action="/compte?/login" method="post">
    <h3>Se connecter</h3>
    <input type="email" autocomplete="email" name="email" placeholder="Courriel">
    <input type="password" autocomplete="current-password" name="password" placeholder="Mot de passe">
    <button type="submit" class="button--black">Étape suivante</button>
  </form>

  <!-- <form class="col col--6of12" action="/compte?/resetPassword" method="post">
    <h3>Reset password</h3>
    <input type="text" name="customerId" placeholder="Customer id">
    <input type="password" autocomplete="current-password" name="password" placeholder="Mot de passe">
    <button type="submit" class="button--black">Soumettre</button>
  </form> -->

  <form class="col col--6of12" action="/compte?/signup" method="post">
    <h3>Créer un compte</h3>
    <input type="text" autocomplete="given-name" name="givenName" placeholder="Prénom">
    <input type="text" autocomplete="family-name" name="familyName" placeholder="Nom">
    <input type="email" autocomplete="email" name="email" placeholder="Courriel">
    <input type="tel" autocomplete="tel" name="phoneNumber" placeholder="Numéro de téléphone">
    <input type="password" autocomplete="new-password" name="password" placeholder="Mot de passe">
    <button type="submit" class="button--black">S’inscrire</button>
  </form>
</main>
{/if}


<style lang="scss">
  :global(.-compte) {
    padding: $base;
    padding-top: $base * 6;
  }

  main {
    align-items: stretch;
  }

  form {
    padding: $base * 2;
    display: flex;
    flex-direction: column;
    gap: $base * 0.75;

    h3 {
      margin: 0 auto ($base * 3);
    }

    input {

      &:last-of-type {
        margin-bottom: $base * 2;
      }
    }

    button {
      margin-top: auto;
    }

    &:last-of-type {
      background-color: $white;
      border-radius: $radius;

      input {
        background-color: $grey;
      }
    }
  }
</style>