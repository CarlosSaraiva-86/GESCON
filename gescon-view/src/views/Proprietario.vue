<template>
  <div>
    <h1>
      Proprietários
      <b-button @click="criar()" variant="primary">
      <b-icon
        icon="folder-plus"
        class="rounded"
        variant="light"
      ></b-icon>Novo
      </b-button>
    </h1>

    <div class="table">
      <b-table striped hover :items="proprietarios" :fields="fields">
        <template v-slot:cell(editar)="modelEdit">
          <b-button @click="editar(modelEdit.item)">Editar</b-button>
          <b-button variant="danger" @click="deletar(modelEdit.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>

    <b-modal
      :id="modalData.id"
      size="xl"
      title="Cadastro Proprietário"
      @ok="onSubmit"
      @hide="resetarModal()"
      ok-title="Salvar"
    >
      <b-form>
        <form-proprietario
          v-on:handler="atualizar"
          :editar="modalData.model"
          :callback="modalData.callback"
        ></form-proprietario>
        <form-endereco
          v-on:handler="atualizarEnd"
          :editar="modalData.endereco"
        ></form-endereco>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import FormProprietario from "../components/FormProprietario.vue";
import FormEndereco from "../components/FormEndereco.vue";

export default {
  name: "Proprietario",
  components: { FormProprietario, FormEndereco },
  mounted() {
    this.getUserData();
    this.$http
      .get("/proprietario")
      .then((result) => {
        this.proprietarios = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      formProprietario: {
        idproprietario: 0,
        nome: "",
        telefone: "",
        cpf: "",
        endereco: {
          logradouro: "",
          bairro: "",
          cidade: "",
          numero: 0,
          cep: "",
          uf: null,
        },
      },
      proprietarios: [],
      fields: ["idproprietario", "nome", "telefone", "cpf", "editar"],
      modalData: {
        id: "modalEdit",
        model: null,
        endereco: null,
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
        .get("/proprietario")
        .then((result) => {
          this.proprietarios = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    criar() {
      this.modalData.callback = (dados) => {
        this.$http
          .post("/proprietario", dados)
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
      this.modalData.endereco = modelEdit.endereco;

      this.modalData.callback = (dados) => {
        this.$http
          .put("/proprietario/" + dados.idproprietario, dados)
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
        .delete("/proprietario/" + modelEdit.idproprietario)
        .then(() => {
          this.carregarDados();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    resetarModal() {
      this.modalData.model = null;
      this.modalData.endereco = null;
    },

    onSubmit() {
      this.modalData.callback(this.formProprietario);
    },

    atualizar(evento) {
      this.formProprietario.idproprietario = evento.idproprietario;
      this.formProprietario.nome = evento.nome;
      this.formProprietario.telefone = evento.telefone;
      this.formProprietario.cpf = evento.cpf;
    },
    atualizarEnd(evento) {
      this.formProprietario.endereco.logradouro = evento[0];
      this.formProprietario.endereco.bairro = evento[1];
      this.formProprietario.endereco.cidade = evento[2];
      this.formProprietario.endereco.numero = evento[3];
      this.formProprietario.endereco.cep = evento[4];
      this.formProprietario.endereco.uf = evento[5];
    },
  },
};
</script>
<style>
.row {
  margin: 5px;
}
div.table {
  margin: 30px;
}
.b-icon{
  margin-right: 5px;
}
</style>