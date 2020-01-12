import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label : 'Receita', value: 'RECEITA' },
    { label : 'Receita', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [];

  constructor(private categoriaService: CategoriasService,
              private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
                                .then(categorias => {
                                  this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }))
                                })
                                .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodos()
                             .then(res => {
                               this.pessoas = res.pessoas.map(p => ({ label: p.nome, value: p.codigo }))
                             })
                             .catch(erro => this.errorHandler.handle(erro));
  }
}
