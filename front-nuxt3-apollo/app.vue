<template>
  <p>There are {{ data?.ships?.length || 0 }} ships.</p>
  a{{ data }}
</template>

<script lang="ts" setup>
const query = gql`
  query {
    results(author: "著者1") {
      ... on Book {
        title
        author
      }
      ... on Movie {
        title
        author
      }
    }
  }
`
const variables = { limit: 1 }

const { data } = await useAsyncQuery(query, variables)
</script>
