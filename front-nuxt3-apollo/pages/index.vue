
<template>
	<!-- <p v-for="r in data.results" :key="r">There are {{ r || 0 }}</p> -->
	<button @click="add">button</button>
	<!-- <main>
		<ContentDoc />
	</main> -->
	<!-- {{ messages }} -->
	a{{ data }}
  </template>

<script lang="ts" setup>

const queryGet = gql`
	query Query($messageId: ID!) {
		message(id: $messageId) {
			createdBy
			text
		}
	}
`
const mutationAdd = gql`
	mutation Mutation($messageInput: MessageInput) {
		createMessage(messageInput: $messageInput) {
			text
			createdBy
		}
	}
`

const subscriptionQuery = gql`
  subscription {
    messageCreated {
      createdBy
      text
    }
  }
`

const { result, onResult, onError } = useSubscription(subscriptionQuery);

onResult((r) => {
		data.value = r.data as any;
	});
	
	onError((e) => {
		console.error(e);
	});

// const messages = ref([]);

const variables = { $messageId: "6460988b5815039025ea828b" }
const { data, refresh } = await useAsyncQuery(queryGet, variables)

const { mutate: mutateAdd } = useMutation(mutationAdd);

const subscribe = ref(false);

const add = async () => {
	subscribe.value = true;

	const newsMessageInput = {
		text: 'text1',
		username: 'name2',
	}
	// データの追加
	
	const { data: createdData } = await mutateAdd({ messageInput: newsMessageInput });
	console.log(createdData);
	// データの更新
	// await useAsyncQuery(queryGet, variables)
}
</script>