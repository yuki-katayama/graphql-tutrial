
<template>
	<!-- <p v-for="r in data.results" :key="r">There are {{ r || 0 }}</p> -->
	<button @click="add">button</button>
	<input v-model="input"/>
	<!-- <main>
		<ContentDoc />
	</main> -->
	<!-- {{ messages }} -->
	<template v-if="result && result.messageCreated">
		{{ result.messageCreated.text }}
	</template>
	<template v-if="messages">
		<template v-for="(m, i) in messages.messages" :key="m.id">
			<p>{{i}} {{ m.text }}</p>
		</template>
	</template>
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

const queryMessages = gql`
	query Messages {
		messages {
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

type Message = {
	text: string,
	createdBy: string
}
type Messages = {
	messages: Message[]
}

type SubscriptionMessage = {
	messageCreated: Message
}

const { result, onResult, onError, loading } = useSubscription<SubscriptionMessage>(subscriptionQuery);
onResult((r) => {
	result.value = r.data;
	refetch();
});

onError((e) => {
	console.log(e);
});

const input = ref<string>("");
const { mutate: mutateAdd } = useMutation<Message>(mutationAdd);
const { result: messages, refetch, loading: load } = useLazyQuery<Messages>(queryMessages)
	refetch();
console.log(messages.value)

watch(messages, (v) => (messages.value = v));
const add = async () => {

	const newsMessageInput = {
		text: input.value,
		username: 'name2',
	}
	// データの追加

	const { data: createdData } = await mutateAdd({ messageInput: newsMessageInput });
	console.log(createdData);
	// データの更新
	// await useAsyncQuery(queryGet, variables)
}
</script>