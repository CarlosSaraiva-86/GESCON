<template>
  <div>
    <h1>
      Unidades
      <b-button @click="criar()" variant="primary">
      <b-icon
        icon="folder-plus"
        class="rounded"
        variant="light"
      ></b-icon>Novo
      </b-button>
    </h1>

    <div class="table">
      <b-table striped hover :items="unidades" :fields="fields">
        <template v-slot:cell(editar)="modelEdit">
          <b-button @click="editar(modelEdit.item)">Editar</b-button>
          <b-button variant="danger" @click="deletar(modelEdit.item)"
            >Excluir</b-button
          >
        </template>
      </b-table>
    </div>

    <b-modal
      :id="modalData.id"
      size="xl"
      title="Cadastro Unidade"
      @ok="onSubmit"
      @hide="resetarModal()"
      ok-title="Salvar"
    >
      <b-form>
        <form-unidade
          v-on:handler="atualizar"
          :editar="modalData.model"
          :callback="modalData.callback"
        ></form-unidade>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import FormUnidade from "../components/FormUnidade.vue";

export default {
  components: { FormUnidade },
  name: "Unidade",
  mounted() {
    this.getUserData();
    this.$http
      .get("/unidade")
      .then((result) => {
        this.unidades = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      formUnidade: {
        idunidade: null,
        numero: null,
        idproprietario: null,
        idcondominio: null,
        proprietario: {
          idproprietario: null,
          nome: "",
          cpf: "",
          telefone: "",
        },
        condominio: {
          idcondominio: null,
          nome: "",
          telefone: "",
        },
      },
      unidades: [],
      fields: [
        "idunidade",
        "numero",
        "proprietario.nome",
        "condominio.nome",
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
    getUserData() {
      this.$auth.get("/api/user")
        .then((response) => {
          console.log(response.data);
          this.$set(this, "user", response.data.user);
        })
        .catch((errors) => {
          console.log(errors);
          this.$router.push("/");
        });
    },
    carregarDados() {
      this.$http
        .get("/unidade")
        .then((result) => {
          this.unidades = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    criar() {
      this.modalData.callback = (dados) => {
        this.$http
          .post("/unidade", dados)
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
        this.$http
          .put("/unidade/" + dados.idunidade, dados)
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
        .delete("/unidade/" + modelEdit.idunidade)
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
      this.modalData.callback(this.formUnidade);
    },
    atualizar(evento) {
      this.formUnidade.idunidade = evento.idunidade;
      this.formUnidade.numero = evento.numero;
      this.formUnidade.idproprietario = evento.idproprietario;
      this.formUnidade.idcondominio = evento.idcondominio;
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