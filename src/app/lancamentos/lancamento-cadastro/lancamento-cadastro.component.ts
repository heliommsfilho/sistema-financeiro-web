import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { format } from 'url';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label : 'Receita', value: 'RECEITA' },
    { label : 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriasService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
                          .then(() => {
                            this.toasty.success('Lançamento adicionado com sucesso!');
                            form.reset();
                            this.lancamento = new Lancamento();
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
                                .then(categorias => {
                                  this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
                                })
                                .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodos()
                             .then(res => {
                               this.pessoas = res.pessoas.map(p => ({ label: p.nome, value: p.codigo }));
                             })
                             .catch(erro => this.errorHandler.handle(erro));
  }
}
