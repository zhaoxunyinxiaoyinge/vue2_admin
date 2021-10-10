<template>
  <div>
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"
    >
      <template slot="$expand" scope="scope">
        {{
          `My name is ${scope.row.name},
           this rowIndex is ${scope.rowIndex}.`
        }}
      </template>
      <template slot="likes" scope="scope">
        {{ scope.row.likes.join(",") }}
      </template>
    </zk-table>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: true,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: true,
        selectionType: true,
      },
      data: [
        {
          name: "Jack",
          sex: "male",
          likes: ["football", "basketball"],
          score: 10,
          children: [
            {
              name: "Ashley",
              sex: "female",
              likes: ["football", "basketball"],
              score: 20,
              children: [
                {
                  name: "Ashley",
                  sex: "female",
                  likes: ["football", "basketball"],
                  score: 20,
                },
                {
                  name: "Taki",
                  sex: "male",
                  likes: ["football", "basketball"],
                  score: 10,
                  children: [
                    {
                      name: "Ashley",
                      sex: "female",
                      likes: ["football", "basketball"],
                      score: 20,
                    },
                    {
                      name: "Taki",
                      sex: "male",
                      likes: ["football", "basketball"],
                      score: 10,
                      children: [
                        {
                          name: "Ashley",
                          sex: "female",
                          likes: ["football", "basketball"],
                          score: 20,
                        },
                        {
                          name: "Taki",
                          sex: "male",
                          likes: ["football", "basketball"],
                          score: 10,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "Taki",
              sex: "male",
              likes: ["football", "basketball"],
              score: 10,
            },
          ],
        },
        {
          name: "Tom",
          sex: "male",
          likes: ["football", "basketball"],
          score: 20,
          children: [
            {
              name: "Ashley",
              sex: "female",
              likes: ["football", "basketball"],
              score: 20,
              children: [
                {
                  name: "Ashley",
                  sex: "female",
                  likes: ["football", "basketball"],
                  score: 20,
                },
                {
                  name: "Taki",
                  sex: "male",
                  likes: ["football", "basketball"],
                  score: 10,
                },
              ],
            },
            {
              name: "Taki",
              sex: "male",
              likes: ["football", "basketball"],
              score: 10,
              children: [
                {
                  name: "Ashley",
                  sex: "female",
                  likes: ["football", "basketball"],
                  score: 20,
                },
                {
                  name: "Taki",
                  sex: "male",
                  likes: ["football", "basketball"],
                  score: 10,
                },
              ],
            },
          ],
        },
        {
          name: "Tom",
          sex: "male",
          likes: ["football", "basketball"],
          score: 20,
        },
        {
          name: "Tom",
          sex: "male",
          likes: ["football", "basketball"],
          score: 20,
          children: [
            {
              name: "Ashley",
              sex: "female",
              likes: ["football", "basketball"],
              score: 20,
            },
            {
              name: "Taki",
              sex: "male",
              likes: ["football", "basketball"],
              score: 10,
            },
          ],
        },
      ],
      columns: [
        {
          label: "name",
          prop: "name",
          width: "400px",
        },
        {
          label: "sex",
          prop: "sex",
          minWidth: "50px",
        },
        {
          label: "score",
          prop: "score",
        },
        {
          label: "likes",
          prop: "likes",
          minWidth: "200px",
          type: "template",
          template: "likes",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
