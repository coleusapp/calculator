<?php

namespace Coleus\Calculator\Commands;

use Illuminate\Console\Command;

class CalculatorCommand extends Command
{
    public $signature = 'calculator';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
