<template>
  <div>
    <div class="row">
      <div class="col-md-1">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-id"
            v-model="formCob.idcobranca"
            placeholder=""
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-2">
        <b-form-group id="input-group-1">
          <b-form-select
            id="input-cond"
            v-model="formCob.idunidade"
            @change="carregarUnidade($event)"
          >
            <option
              v-for="modelSelected in unidades"
              :key="modelSelected.idunidade"
              :value="modelSelected.idunidade"
            >
              {{ modelSelected.numero }}
            </option>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-md-4">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-nome"
            v-model="formCob.unidade.condominio.nome"
            placeholder="Condomínio"
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-4">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-nome"
            v-model="formCob.unidade.proprietario.nome"
            placeholder="Proprietário"
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-nome"
            v-model="formCob.descricao"
            placeholder="Descrição"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-4">
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-valor"
            v-model="formCob.valor"
            placeholder="Valor"
            required
          ></b-form-input>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editar: {
      idcobranca: Number,
      idunidade: Number,
      descricao: String,
      valor: Number,
    },
    callback: Function,
  },
  data() {
    return {
      formCob: {
        idcobranca: null,
        idunidade: null,
        descricao: "",
        valor: null,
        unidade: {
          idunidade: null,
          condominio: {
            nome: "",
          },
          proprietario: {
            nome: "",
          },
        },
      },
      unidades: [],
    };
  },
  mounted() {
    if (this.editar) {
      this.formCob.idcobranca = this.editar.idcobranca;
      this.formCob.idunidade = this.editar.unidade.idunidade;
      this.formCob.descricao = this.editar.descricao;
      this.formCob.valor = this.editar.valor;
      this.carregarUnidade(this.formCob.idunidade);
    }
    this.$http
      .get("/unidade")
      .then((result) => {
        this.unidades = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    formCob: {
      handler() {
        this.$emit("handler", this.formCob);
      },
      deep: true,
    },
  },
  methods: {
    carregarUnidade(evento) {
      this.$http
        .get("/unidade/" + evento)
        .then((result) => {
          console.log(result.data);
          this.formCob.unidade = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>