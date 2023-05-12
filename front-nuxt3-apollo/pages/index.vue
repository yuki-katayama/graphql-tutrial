
<template>
	<p v-for="r in data.results" :key="r">There are {{ r || 0 }}</p>
	<button @click="add">button</button>
	<!-- <main>
		<ContentDoc />
	</main> -->
	{{ messages }}
  </template>
  
  <script lang="ts" setup>
  const queryGet = gql`
	query($title: String) {
	  results(title: $title) {
		... on BookModel {
		  title
		  author
		}
		... on MovieModel {
		  title
		  author
		}
	  }
	}
  `
  
  const mutationAdd = gql`
	mutation Mutation($input: CreateBookInput!) {
	  createBook(input: $input) {
		author
		title
	  }
	}
  `

const { result } = useSubscription(gql`
  subscription {
    bookAdded {
      title
      author
    }
  }
`);

const messages = ref([]);

watch(result, (newValue, oldValue) => {
  if (newValue && newValue.data && newValue.data.bookAdded) {
    messages.value.push(newValue.data.bookAdded);
  }
}, { immediate: true });


  const variables = { title: null }
  const { data } = await useAsyncQuery(queryGet, variables)
  const { mutate: mutateAdd } = useMutation(mutationAdd);
  
  const add = async () => {
	const newBookInput = {
	  title: '新しい本のタイトル',
	  author: '新しい本の著者',
	}
  
	// データの追加
	const { data: createdData } = await mutateAdd({ input: newBookInput });
	console.log(createdData);
  
	// データの更新
	// await useAsyncQuery(queryGet, variables)
  }
  
  </script>
  