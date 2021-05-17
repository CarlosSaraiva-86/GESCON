<template>
  <div>
    <h1>
      Cobrança
      <b-icon
        @click="criar()"
        icon="folder-plus"
        class="rounded bg-primary"
        variant="light"
      ></b-icon>
    </h1>

    <div class="table">
      <b-table striped hover :items="cobrancas" :fields="fields">
        <template v-slot:cell(editar)="modelEdit">
          <b-button @click="editar(modelEdit.item)">Editar</b-button>
          <b-button variant="danger" @click="deletar(modelEdit.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>

    <b-modal
      :id="modalData.id"
      size="xl"
      title="Cadastro Cobrança"
      @ok="onSubmit"
      @hide="resetarModal()"
      ok-title="Salvar"
    >
      <b-form>
        <form-cobranca
          v-on:handler="atualizar"
          :editar="modalData.model"
          :callback="modalData.callback"
        ></form-cobranca>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import FormCobranca from "../components/FormCobranca.vue";

export default {
  components: { FormCobranca },
  name: "Cobranca",
  mounted() {
    this.$http
      .get("/cobranca")
      .then((result) => {
        this.cobrancas = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      formCob: {
        idcobranca: null,
        idunidade: null,
        descricao: null,
        valor: null,
        unidade: {
          idunidade: null,
          numero: null,
          condominio: {
            nome: "",
          },
        },
      },
      cobrancas: [],
      fields: [
        "idcobranca",
        "unidade.idunidade",
        "unidade.condominio.nome",
        "descricao",
        "valor",
        "editar",
      ],
      modalData: {
        id: "modalEdit",
        model: null,
        callback: "",
      },
    };
  },
  methods: {
    carregarDados() {
      this.$http
        .get("/cobranca")
        .then((result) => {
          this.cobrancas = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    criar() {
      this.modalData.callback = (dados) => {
        this.$http
          .post("/cobranca", dados)
          .then(() => {
            this.carregarDados();
          })
          .catch((error) => {
            console.log(error);
          });
      };
      this.$root.$emit("bv::show::modal", this.modalData.id);
    },

    editar(modelEdit) {
      this.modalData.model = modelEdit;
      this.modalData.callback = (dados) => {
        console.log(dados);
        this.$http
          .put("/cobranca/" + dados.idcobranca, dados)
          .then(() => {
            this.carregarDados();
          })
          .catch((error) => {
            console.log(error);
          });
      };
      this.$root.$emit("bv::show::modal", this.modalData.id);
    },

    deletar(modelEdit) {
      this.$http
        .delete("/cobranca/" + modelEdit.idcobranca)
        .then(() => {
          this.carregarDados();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    resetarModal() {
      this.modalData.model = null;
    },

    onSubmit() {
      this.modalData.callback(this.formCob);
    },

    atualizar(evento) {
      this.formCob.idcobranca = evento.idcobranca;
      this.formCob.idunidade = evento.idunidade;
      this.formCob.descricao = evento.descricao;
      this.formCob.valor = evento.valor;
    },
  },
};
</script>

<style>
div.row {
  margin: 5px;
}
div.table {
  margin: 30px;
}
</style>