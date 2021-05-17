<template>
  <div>
    <h1>
      Condomínios
      <b-icon
        @click="criar()"
        icon="folder-plus"
        class="rounded bg-primary"
        variant="light"
      ></b-icon>
    </h1>

    <div class="table">
      <b-table striped hover :items="condominios" :fields="fields">
        <template v-slot:cell(editar)="modelEdit">
          <b-button @click="editar(modelEdit.item)">Editar</b-button>
          <b-button variant="danger" @click="deletar(modelEdit.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>
    
    <b-modal
      :id="modalData.id"
      size="xl"
      title="Cadastro Condominio"
      @ok="onSubmit"
      @hide="resetarModal()"
      ok-title="Salvar"
    >
      <b-form>
        <form-condominio
          v-on:handler="atualizar"
          :editar="modalData.model"
          :callback="modalData.callback"
        ></form-condominio>
        <form-endereco
          v-on:handler="atualizarEnd"
          :editar="modalData.endereco"
        ></form-endereco>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import FormCondominio from "../components/FormCondominio.vue";
import FormEndereco from "../components/FormEndereco.vue";

export default {
  name: "Condominio",
  components: { FormCondominio, FormEndereco },
  mounted() {
    this.$http
      .get("/condominio")
      .then((result) => {
        this.condominios = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      formCondominio: {
        idcondominio: 0,
        idadministradora: 0,
        nome: "",
        telefone: "",
        endereco: {
          logradouro: "",
          bairro: "",
          cidade: "",
          numero: 0,
          cep: "",
          uf: null,
        },
      },
      condominios: [],
      fields: ["idcondominio", "nome", "telefone", "editar"],
      modalData: {
        id: "modalEdit",
        model: null,
        endereco: null,
        callback: "",
      },
    };
  },
  methods: {
     carregarDados() {
      this.$http
        .get("/condominio")
        .then((result) => {
          this.condominios = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    criar() {
      this.modalData.callback = (dados) => {
        this.$http
          .post("/condominio", dados)
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
          .put("/condominio/" + dados.idcondominio, dados)
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
        .delete("/condominio/" + modelEdit.idcondominio)
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
      this.modalData.callback(this.formCondominio);
    },

    atualizar(evento) {
      this.formCondominio.idcondominio = evento.idcondominio;
      this.formCondominio.idadministradora = evento.idadministradora;
      this.formCondominio.nome = evento.nome;
      this.formCondominio.telefone = evento.telefone;
    },

    atualizarEnd(evento) {
      this.formCondominio.endereco.logradouro = evento[0];
      this.formCondominio.endereco.bairro = evento[1];
      this.formCondominio.endereco.cidade = evento[2];
      this.formCondominio.endereco.numero = evento[3];
      this.formCondominio.endereco.cep = evento[4];
      this.formCondominio.endereco.uf = evento[5];
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