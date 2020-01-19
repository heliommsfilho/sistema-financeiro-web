import {RouterModule, Routes} from '@angular/router';
import {LancamentosPesquisaComponent} from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import {LancamentoCadastroComponent} from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import {PessoasPesquisaComponent} from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import {PaginaNaoEncotradaComponent} from './core/pagina-nao-encotrada.component';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pagina-nao-encotrada', component: PaginaNaoEncotradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encotrada' }
];

registerLocaleData(localePt, 'pt-BR');

@NgModule({

  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
