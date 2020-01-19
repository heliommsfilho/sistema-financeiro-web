import {Component, OnInit} from '@angular/core';
import {CategoriasService} from 'src/app/categorias/categorias.service';
import {PessoaService} from 'src/app/pessoas/pessoa.service';
import {ErrorHandlerService} from 'src/app/core/error-handler.service';
import {Lancamento} from 'src/app/core/model';
import {FormControl} from '@angular/forms';
import {LancamentoService} from '../lancamento.service';
import {ToastyService} from 'ng2-toasty';
import {ActivatedRoute, Router} from '@angular/router';

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
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => { this.lancamento = lancamento; })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
                          .then((lancamentoAdicionado) => {
                            this.toasty.success('Lançamento adicionado com sucesso!');
                            this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    console.log('lanc', this.lancamento);

    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.toasty.success('Lançamento alterado com sucesso');
      })
      .catch(erro => {
        console.log(erro);
        this.errorHandler.handle(erro);
      });
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

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }
}
