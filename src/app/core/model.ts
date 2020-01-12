class Endereco {
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
}

export class Categoria {
    codigo: number;
}

export class Pessoa {
    nome: string;
    ativo = true;
    endereco = new Endereco();
}

export class Lancamento {
    codigo: number;
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}